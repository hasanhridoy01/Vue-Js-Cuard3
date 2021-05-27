<?php

//Database Connection
$conn = new mysqli('localhost','root','','vuecrudmain');

//Data Recive Form Database
$data = json_decode(file_get_contents('php://input'));

//Get Action
$action = 'read';
if( isset($_GET['action']) ){
   $action = $_GET['action'];
}

//Create a job form Database
if( $action == 'add' ){

    //file value
    $file_name = $_FILES['photo']['name'];
    $file_tmp_name = $_FILES['photo']['tmp_name'];

    //file name unique
    $unique_file_name = md5(time().rand()) .'.'. $file_name;

    //file upload from folder
    move_uploaded_file($file_tmp_name, '../assets/media/employee/' . $unique_file_name);
   
    //get value form From fileds
    $title = $_POST['title'];
    $description = $_POST['description'];
    $catagory = $_POST['catagory'];
    $budget = $_POST['budget'];
    $location = $_POST['location'];
    $remotelocation = $_POST['remotelocation'];
    $photo = $unique_file_name;

    $data = $conn -> query("INSERT INTO employee (title, description, catagory, budget, location, remotelocation, photo) VALUE ('$title','$description','$catagory','$budget','$location','$remotelocation','$unique_file_name')");
}

//get all emoloyee form Database
if( $action == 'read' ){
    $data = $conn -> query("SELECT * FROM employee ORDER By id DESC");
    $all_data = [];
    while( $employee = $data -> fetch_assoc() ){
      array_push($all_data, $employee);
    }
    echo json_encode($all_data);
}

//get single emoloyee form Database
if( $action == 'view' ){
    //get id
    $id = $_GET['id'];
    $data = $conn -> query("SELECT * FROM employee WHERE id='$id'");
    $single_student_data = $data -> fetch_assoc();
    echo json_encode($single_student_data);
}

//delete single emoloyee form Database
if( $action == 'delete' ){
    //get id
    $id = $_GET['id'];
    $data = $conn -> query("DELETE FROM employee WHERE id='$id'");
}

//search single emoloyee form Database
if( $action == 'search' ){
    //get id
    $search_text = $_GET['search'];
    $data = $conn -> query("SELECT * FROM employee WHERE title LIKE '%$search_text%'");

    $search_data = [];
    while( $search = $data -> fetch_assoc() ){
      array_push($search_data, $search);
    }
    echo json_encode($search_data);
}

//category search emoloyee form Database
if( $action == 'categorysearch' ){
    //get id
    $categorysearch = $_GET['categorysearch'];
    $data = $conn -> query("SELECT * FROM employee WHERE catagory='$categorysearch'");

    $search_data = [];
    while( $search = $data -> fetch_assoc() ){
      array_push($search_data, $search);
    }
    echo json_encode($search_data);
}

//priceRang search emoloyee form Database
if( $action == 'Rangbar' ){
  //get id
  $price = $_GET['priceRang'];
  $data = $conn -> query("SELECT * FROM employee WHERE budget='$price'");

  $search_data = [];
  while( $search = $data -> fetch_assoc() ){
    array_push($search_data, $search);
  }
  echo json_encode($search_data);
}

//Location search emoloyee form Database
if( $action == 'Location' ){
  //get id
  $location = $_GET['location'];
  $data = $conn -> query("SELECT * FROM employee WHERE location='$location'");

  $search_data = [];
  while( $search = $data -> fetch_assoc() ){
    array_push($search_data, $search);
  }
  echo json_encode($search_data);
}

//view emoloyee form Database
if( $action == 'edit' ){
  //get id
  $id = $_GET['id'];
  $data = $conn -> query("SELECT * FROM employee WHERE id='$id'");
  $single_student_data = $data -> fetch_assoc();
  echo json_encode($single_student_data);
}

//view emoloyee form Database
if( $action == 'update' ){
  //get value
  $id = $_POST['id'];
  $title = $_POST['title'];
  $description = $_POST['description'];
  $catagory = $_POST['catagory'];
  $budget = $_POST['budget'];
  $location = $_POST['location'];
  $remotelocation = $_POST['remotelocation'];
  $data = $conn -> query("UPDATE employee SET title='$title', description='$description', catagory='$catagory', budget='$budget', location='$location', remotelocation='$remotelocation' WHERE id='$id'");
}