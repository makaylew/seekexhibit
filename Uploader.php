<html>
<head>
  <link type="text/css" rel="stylesheet" href="/stylesheets/main.css" />
</head>
  <body>
  <center>
  <div class="form">
    <?php require_once 'google/appengine/api/cloud_storage/CloudStorageTools.php';
use google\appengine\api\cloud_storage\CloudStorageTools;

$options = [ 'gs_bucket_name' => 'seekexhibitgclouduploader.appspot.com' ];
$upload_url = CloudStorageTools::createUploadUrl('/upload_handler.php', $options); ?>
<form action="<?php echo $upload_url?>" enctype="multipart/form-data" method="post">
    Files to upload: <br>
   <input type="file" name="uploaded_files" size="40">
   <input type="submit" value="Send">
</form>
</div>
  </body>
</html>
