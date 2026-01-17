import { expect } from "chai";
import { ethers } from "hardhat";
import { GreetingBoard } from "../typechain-types";

describe("GreetingBoard", function () {
    let greetingBoard: GreetingBoard;
    let owner: any;
    let addr1: any;
    let addr2: any;

    // Deploy fresh contract before each test
    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        const GreetingBoardFactory = await ethers.getContractFactory("GreetingBoard");
        greetingBoard = await GreetingBoardFactory.deploy();
        await greetingBoard.waitForDeployment();
    });

    describe("writeGreeting", function () {
        it("should store a greeting correctly", async function () {
            // Write a greeting
            await greetingBoard.connect(addr1).writeGreeting("Hello, World!");

            // Get all greetings and verify
            const greetings = await greetingBoard.getAllGreetings();

            expect(greetings.length).to.equal(1);
            expect(greetings[0].sender).to.equal(addr1.address);
            expect(greetings[0].message).to.equal("Hello, World!");
        });

        it("should reject empty messages", async function () {
            await expect(
                greetingBoard.connect(addr1).writeGreeting("")
            ).to.be.revertedWith("Message cannot be empty");
        });

        it("should keep only the last 5 greetings", async function () {
            // Write 6 greetings
            for (let i = 1; i <= 6; i++) {
                await greetingBoard.connect(addr1).writeGreeting(`Message ${i}`);
            }

            // Should only have 5 greetings
            const greetings = await greetingBoard.getAllGreetings();
            expect(greetings.length).to.equal(5);

            // First message should be "Message 2" (oldest removed)
            expect(greetings[0].message).to.equal("Message 2");

            // Last message should be "Message 6" (newest)
            expect(greetings[4].message).to.equal("Message 6");
        });

        it("should increment totalGreetings counter", async function () {
            await greetingBoard.connect(addr1).writeGreeting("Hello");
            await greetingBoard.connect(addr1).writeGreeting("World");

            const total = await greetingBoard.getTotalGreetings();
            expect(total).to.equal(2);
        });
    });

    describe("getAllGreetings", function () {
        it("should return empty array when no greetings", async function () {
            const greetings = await greetingBoard.getAllGreetings();
            expect(greetings.length).to.equal(0);
        });

        it("should return all greetings with correct data", async function () {
            // Write greetings from different addresses
            await greetingBoard.connect(addr1).writeGreeting("From addr1");
            await greetingBoard.connect(addr2).writeGreeting("From addr2");

            const greetings = await greetingBoard.getAllGreetings();

            expect(greetings.length).to.equal(2);
            expect(greetings[0].sender).to.equal(addr1.address);
            expect(greetings[1].sender).to.equal(addr2.address);
        });
    });

    describe("Events", function () {
        it("should emit GreetingUpdated event when writing greeting", async function () {
            // Just check that the event is emitted with sender and message
            await expect(greetingBoard.connect(addr1).writeGreeting("Test message"))
                .to.emit(greetingBoard, "GreetingUpdated");
        });
    });
});
