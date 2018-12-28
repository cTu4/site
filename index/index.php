<!doctype html>
<html xmlns="">

<head>
    <title>Видеокарты</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="stylesheet" type="text/css" href="css/theme-triton-all.css"/>
    <link rel="stylesheet" type="text/css" href="style.css"/>
	<script type="text/javascript" src="ext-all-debug.js"></script>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://raw.githubusercontent.com/JoeKuan/Highcharts-Ext-JS-Adapter/master/Ext.ux.HighChart.js"></script>
    <script type="text/javascript" src="main.js"></script>
</head>
<?php include "db_config.php";?>

<body>
<div  id="table" width=100%></div>
</body>
<script type="text/javascript">
    <?php
    $sql="select maker,model,code,memory,freqgpu,freqmem,directx,monitor,interface,resolution,connection from videocards inner join makers on videocards.maker_id=makers.maker_id inner join models on videocards.model_id=models.model_id inner join interface on videocards.interface_id=interface.interface_id inner join resolution on videocards.resolution_id=resolution.resolution_id inner join connection on videocards.connection_id=connection.connection_id";
    $table = mysqli_query($dbconn,$sql);
    $table = mysqli_fetch_all($table);
    //$mem = json_encode($mem, JSON_NUMERIC_CHECK);
    $arr = [];
    foreach($table as $key => $val)
    {
        array_push($arr, ['maker' => $val[0], 'model' => $val[1],
            'code' => $val[2],'memory' => $val[3],'freqgpu' => $val[4],'freqmem' => $val[5],
            'directx' => $val[6],'monitor' => $val[7],'interface' => $val[8],
            'resolution' => $val[9],'connection' => $val[10]]);
    }

    $js = json_encode($arr, JSON_NUMERIC_CHECK);
    ?>
    var data_table = JSON.parse('<?= $js; ?>');
    //console.log(data_table);

</script>


<script type="text/javascript">
    //maker
    <?php
    $sql = "select DISTINCT maker, COUNT(maker) as count from videocards inner join makers on videocards.maker_id=makers.maker_id GROUP BY maker";
    $maker = mysqli_query($dbconn,$sql);
    $maker = mysqli_fetch_all($maker);
    //$mem = json_encode($mem, JSON_NUMERIC_CHECK);
    $arr = [];
    foreach($maker as $key => $val)
    {
        array_push($arr, ['name' => $val[0], 'y' => $val[1]]);
    }

    $js = json_encode($arr, JSON_NUMERIC_CHECK);
    ?>
    var data_maker = JSON.parse('<?= $js; ?>');
    //console.log(data_maker);



    //memory
    <?php
    $sql = "select DISTINCT memory, COUNT(memory) as count from videocards GROUP BY memory";
    $mem = mysqli_query($dbconn,$sql);
    $mem = mysqli_fetch_all($mem);
    //$mem = json_encode($mem, JSON_NUMERIC_CHECK);
    $arr = [];
    foreach($mem as $key => $val)
    {
        array_push($arr, ['name' => $val[0] . ' ГБ', 'y' => $val[1]]);
    }

    $js = json_encode($arr, JSON_NUMERIC_CHECK);
    ?>
    var data_mem = JSON.parse('<?= $js; ?>');
    //console.log(data_mem);

    // interface
    <?php
    $sql = "select DISTINCT interface, COUNT(interface) as count from videocards inner join interface on videocards.interface_id=interface.interface_id GROUP BY interface";
    $interface = mysqli_query($dbconn,$sql);
    $interface = mysqli_fetch_all($interface);
    //$mem = json_encode($mem, JSON_NUMERIC_CHECK);
    $arr = [];
    foreach($interface as $key => $val)
    {
        array_push($arr, ['name' => $val[0], 'y' => $val[1]]);
    }

    $js = json_encode($arr, JSON_NUMERIC_CHECK);
    ?>
    var data_interface = JSON.parse('<?= $js; ?>');
    //console.log(data_interface);


    // freqmem
    <?php
    $sql = "select code,freqmem from videocards order by freqmem";
    $viewer = mysqli_query($dbconn,$sql);
    $viewer = mysqli_fetch_all($viewer);
    $viewer = json_encode($viewer,JSON_NUMERIC_CHECK);
    ?>
    var data_viewer = JSON.parse('<?php echo $viewer; ?>');
    //console.log(data_viewer);

    // freqgpu
    <?php
    $sql = "select code,freqgpu from videocards order by freqgpu";
    $freqgpu = mysqli_query($dbconn,$sql);
    $freqgpu = mysqli_fetch_all($freqgpu);
    $freqgpu = json_encode($freqgpu,JSON_NUMERIC_CHECK);
    ?>
    var data_freqgpu = JSON.parse('<?php echo $freqgpu; ?>');
    //console.log(data_viewer);


    // DirectX
    <?php
    $sql = "select DISTINCT directx, COUNT(directx) as count from videocards GROUP BY directx";
    $directx = mysqli_query($dbconn,$sql);
    $directx = mysqli_fetch_all($directx);
    //$mem = json_encode($mem, JSON_NUMERIC_CHECK);
    $arr = [];
    foreach($directx as $key => $val)
    {
        array_push($arr, ['name' => $val[0].' version', 'y' => $val[1]]);
    }

    $js = json_encode($arr, JSON_NUMERIC_CHECK);
    ?>
    var data_directx = JSON.parse('<?= $js; ?>');
    //console.log(data_mem);

    // monitor
    <?php
    $sql = "select DISTINCT monitor, COUNT(monitor) as count from videocards GROUP BY monitor";
    $monitor = mysqli_query($dbconn,$sql);
    $monitor = mysqli_fetch_all($monitor);
    //$mem = json_encode($mem, JSON_NUMERIC_CHECK);
    $arr = [];
    foreach($monitor as $key => $val)
    {
        array_push($arr, ['name' => 'Кол-во мониторов: '.$val[0], 'y' => $val[1]]);
    }

    $js = json_encode($arr, JSON_NUMERIC_CHECK);
    ?>
    var data_monitor = JSON.parse('<?= $js; ?>');
    //console.log(data_mem);

    //resolution
    <?php
    $sql = "select DISTINCT resolution, COUNT(resolution) as count from videocards inner join resolution on videocards.resolution_id=resolution.resolution_id GROUP BY resolution";
    $resolution = mysqli_query($dbconn,$sql);
    $resolution = mysqli_fetch_all($resolution);
    //$mem = json_encode($mem, JSON_NUMERIC_CHECK);
    $arr = [];
    foreach($resolution as $key => $val)
    {
        array_push($arr, ['name' => $val[0], 'y' => $val[1]]);
    }

    $js = json_encode($arr, JSON_NUMERIC_CHECK);
    ?>
    var data_resolution = JSON.parse('<?= $js; ?>');
    console.log(data_interface);


    //connection
    <?php
    $sql = "select DISTINCT connection, COUNT(connection) as count from videocards inner join connection on videocards.connection_id=connection.connection_id GROUP BY connection";
    $connection = mysqli_query($dbconn,$sql);
    $connection = mysqli_fetch_all($connection);
    //$mem = json_encode($mem, JSON_NUMERIC_CHECK);
    $arr = [];
    foreach($connection as $key => $val)
    {
        array_push($arr, ['name' => $val[0], 'y' => $val[1]]);
    }

    $js = json_encode($arr, JSON_NUMERIC_CHECK);
    ?>
    var data_connection = JSON.parse('<?= $js; ?>');
    console.log(data_interface);
</script>
</html>
