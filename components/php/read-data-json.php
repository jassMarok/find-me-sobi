<?php
$csv = array_map('str_getcsv', file('SOBI_HUBS.csv'));
array_walk($csv, function(&$a) use ($csv) {
  $a = array_combine($csv[0], $a);
});
array_shift($csv); // remove column header


echo json_encode($csv);

/*Working Returning Json data from a file in same directory need to figure out how to open file streams from 
other directories.
*/

?>
