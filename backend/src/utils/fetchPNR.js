import axios from "axios";

const options = {
  method: "GET",
  url: "https://pnr-status-indian-railway.p.rapidapi.com/pnr-check/9531575878",
  headers: {
    "x-rapidapi-key": "bd7e04e366mshd4d940c7ef2c797p146130jsn13cb206581c3",
    "x-rapidapi-host": "pnr-status-indian-railway.p.rapidapi.com",
  },
};

async function fetchPNR() {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    const dummyRes = {
      status: "success",
      message: "PNR Status Found",
      data: {
        pnr: "1234567890",
        train_name: "Rajdhani Express",
        train_number: "11040",
        from_station: "New Delhi",
        to_station: "Mumbai",
        journey_date: "2024-11-28",
        chart_prepared: "Yes",
        arrival_time: "07:30",
        departure_time: "23:00",
        distance: "1365 km",
        passengers: [
          {
            passenger_no: 1,
            name: "John Doe",
            booking_status: "Confirmed",
            coach: "A1",
            berth: "Upper",
            quota: "General",
          },
          {
            passenger_no: 2,
            name: "Jane Doe",
            booking_status: "Waitlist",
            waitlist_number: "WL10",
            coach: "A1",
            berth: "Lower",
            quota: "General",
          },
        ],
      },
    };
    return dummyRes;
  }
}

export { fetchPNR };

// train live location
//https://rappid.in/apis/train.php?train_no=11040
