<?php
$servername = getenv('CRAFT_DB_SERVER');
$username = getenv('CRAFT_DB_USER');
$password = getenv('CRAFT_DB_PASSWORD');
$dbname = getenv('CRAFT_DB_DATABASE');

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connected successfully";
}

$conn->close();
