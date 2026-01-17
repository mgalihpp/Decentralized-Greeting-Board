// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title GreetingBoard
 * @author Web3 Portfolio Project
 * @notice A decentralized greeting board that stores the last 5 messages
 * @dev Simple smart contract demonstrating struct arrays, events, and state management
 */
contract GreetingBoard {
    // ============================================================
    // STRUCTS
    // ============================================================

    /**
     * @notice Structure to store greeting data
     * @param sender Address of the person who wrote the greeting
     * @param message The greeting message content
     * @param timestamp Unix timestamp when the greeting was written
     */
    struct Greeting {
        address sender;
        string message;
        uint256 timestamp;
    }

    // ============================================================
    // STATE VARIABLES
    // ============================================================

    /// @notice Maximum number of greetings to store
    uint256 public constant MAX_GREETINGS = 5;

    /// @notice Array to store all greetings (max 5)
    Greeting[] public greetings;

    /// @notice Counter for total greetings ever written
    uint256 public totalGreetings;

    // ============================================================
    // EVENTS
    // ============================================================

    /**
     * @notice Emitted when a new greeting is written
     * @param sender Address of the person who wrote the greeting
     * @param message The greeting message content
     * @param timestamp Unix timestamp when the greeting was written
     */
    event GreetingUpdated(
        address indexed sender,
        string message,
        uint256 timestamp
    );

    // ============================================================
    // EXTERNAL FUNCTIONS
    // ============================================================

    /**
     * @notice Write a new greeting to the board
     * @dev If the board already has 5 messages, the oldest one will be removed
     * @param _message The greeting message to store (cannot be empty)
     */
    function writeGreeting(string memory _message) external {
        // Validasi: pesan tidak boleh kosong
        require(bytes(_message).length > 0, "Message cannot be empty");

        // Buat greeting baru
        Greeting memory newGreeting = Greeting({
            sender: msg.sender,
            message: _message,
            timestamp: block.timestamp
        });

        // Jika sudah ada 5 pesan, hapus yang paling lama (shift array)
        if (greetings.length >= MAX_GREETINGS) {
            // Shift semua elemen ke kiri (hapus index 0)
            for (uint256 i = 0; i < greetings.length - 1; i++) {
                greetings[i] = greetings[i + 1];
            }
            // Ganti elemen terakhir dengan greeting baru
            greetings[greetings.length - 1] = newGreeting;
        } else {
            // Jika belum penuh, tambahkan langsung
            greetings.push(newGreeting);
        }

        // Increment counter total greetings
        totalGreetings++;

        // Emit event untuk notifikasi frontend
        emit GreetingUpdated(msg.sender, _message, block.timestamp);
    }

    /**
     * @notice Get all stored greetings
     * @dev Returns an array of Greeting structs (max 5 items)
     * @return Array of Greeting structs containing sender, message, and timestamp
     */
    function getAllGreetings() external view returns (Greeting[] memory) {
        return greetings;
    }

    /**
     * @notice Get the total number of greetings ever written
     * @dev This counter never decreases, even when old messages are removed
     * @return Total number of greetings written since contract deployment
     */
    function getTotalGreetings() external view returns (uint256) {
        return totalGreetings;
    }

    /**
     * @notice Get the current number of greetings stored
     * @dev Will be between 0 and MAX_GREETINGS (5)
     * @return Current length of the greetings array
     */
    function getGreetingsCount() external view returns (uint256) {
        return greetings.length;
    }
}
