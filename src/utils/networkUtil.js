const BASE_URL = "http://127.0.0.1:5000";

async function predByDateHour(dateTime) {
  let date = dateTime.split("T")[0];
  let hour = dateTime.split("T")[1].split(":")[0];
  let apiCallString = `${BASE_URL}/pred_by_date_hour?date=${date}&hour=${hour}`;
  console.log(apiCallString);
  let response = await fetch(apiCallString);
  if (response.status == 200) {
    let predictionData = await response.json();
    return predictionData;
  } else {
    throw Error("Failed to fetch predictions for Grid.");
  }
}

async function predTableData(gridId, dateTime) {
  let date = dateTime.split("T")[0];
  let apiCallString = `${BASE_URL}/pred_table_data?grid=${gridId}&date=${date}`;
  console.log(apiCallString);
  let response = await fetch(apiCallString);
  if (response.status == 200) {
    let data = await response.json();
    return data;
  } else {
    throw Error(`Failed to fetch table data for grid ${gridId} on ${date}`);
  }
}

export { predByDateHour, predTableData };
