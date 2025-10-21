<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");

$domain = "plesk.remote.ac";
$username = "WS411479_WEBDEV";
$password = "iTwMY4u1yg#gb9&u";
$dbName = "WS411479_WEBDEV";

$conn = new mysqli($domain, $username, $password, $dbName);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $result = $conn->query("SELECT * FROM todo_items ORDER BY date_created DESC");
    $tasks = [];
    while ($row = $result->fetch_assoc()) {
        $row['completed'] = (bool)$row['completed']; 
        $tasks[] = $row;
    }
    echo json_encode($tasks);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $task = $data['task'];

    $stmt = $conn->prepare("INSERT INTO todo_items (task) VALUES (?)");
    $stmt->bind_param("s", $task);
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "id" => $conn->insert_id]);
    } else {
        echo json_encode(["error" => $stmt->error]);
    }
} elseif ($method === 'PUT') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    
    $stmt = $conn->prepare("UPDATE todo_items SET completed = NOT completed WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => $stmt->error]);
    }
} elseif ($method === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];

    $stmt = $conn->prepare("DELETE FROM todo_items WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => $stmt->error]);
    }
}

$conn->close();
?>