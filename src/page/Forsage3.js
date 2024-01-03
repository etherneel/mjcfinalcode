import React, { useEffect, useState } from "react";
import img6 from "../image/svg-image-6.svg";
import img8 from "../image/svg-image-8.svg";
import img4 from "../image/svg-image-4.svg";
import tiffanysedo from "../image/blue-blur.png";
import Navbar from "../component/navbar";
import img1 from "../image/Vector.svg";
import PriviewId from "../component/PriviewId";
import "./style.css";
import { Link } from "react-router-dom";
import {
  ConnectWallet,
  useSDK,
  useTokenBalance,
  useContract,
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";

const Forsage1 = () => {


  var storedData = localStorage.getItem('userData');
  var userDataReal = JSON.parse(storedData);
  const wallet_address = userDataReal?.data?.wallet_address;

  
  const [tableData, setTableData] = useState("");
  const fetchData2 = () => {
    
    const apiUrl = `https://nodes.mjccoin.io/v1/filtering?address=${wallet_address}&amount=200`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTableData(data.data);
         
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  

  const [previewID, setPreviewID] = useState("");
  const [userData, setUserData] = useState(null);

  const handleChange = (event) => {
    setPreviewID(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("https://nodes.mjccoin.io/v1/alldetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: previewID }),
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleSearch = () => {
    // fetchData();
    fetchData2();
  };

  
useEffect(()=>{
  fetchData2();
}, [])
 
  
   
  // Retrieve data from localStorage


  const { contract } = useContract(
    "0xc1931Dc38541A982da5470f10Bf5C3Ed51F40490"
  );
  const { contract: USDTContract } = useContract(
    "0xb8105200336560A6E0f3E3EA3A7515AbB341E3e46"
  );

  const numberOfElements = 10; // Change this to the desired number of elements
  const { data: getThePlansCount, isLoading: isPlanCountLoading } =
  useContractRead(contract, "getThePlanCount", [wallet_address, 200]);

  const result200 = getThePlansCount;
  
  const box200 = Number(result200 && result200?._hex);

  const blueElements200 = Array.from({ length: 10 }).map((_, index) => (
    <h3
      key={index}
      className={
        index < box200 ? "forsage_detail_box" : "forsage_blue other_box"
      }
    >
      {index < tableData.length ? tableData[index].user_id : null} {/* Assuming TableData contains the data you want to display */}
    </h3>
  ));

  return (
    <React.Fragment>
      <div className="container">
        <div className="pre_Id">
          <div className="pri_id_img">
            <img src={img1} alt="logo" className="logoimg_priview" />
            <p>Preview ID</p>
            <div className="input_btn">
              <input
                value={previewID}
                type="number"
                onChange={handleChange}
                className="input_NUmber"
              />
              <button type="button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
          <div className="connect_btn">
            <ConnectWallet />
          </div>
        </div>
      </div>
      <Navbar />
      <div className="content">
        <div className="container">
          <div className="forsgae1_main">
            {/* <div className='forsage_title2'>
            <h1>MJC</h1>
            <h3>174 209.8 BUSD</h3>
          </div> */}

            <div
              className="forsgae_level_card"
              // style={{
              //   backgroundImage: `url(${tiffanysedo})`,
              //   backgroundSize: "cover",
              // }}
            >
              {/* <div className='bg_imes_forsgae'>
              <img src={tiffanysedo} alt='blue_color' className='greenBg2' />
            </div> */}
              <div className="level_title">
                <h4></h4>
                <h1>$200 Plan</h1>
                <h4></h4>
              </div>
              <div className="levels_card_chain">
                <div className="card_chain2">{blueElements200}</div>
              </div>

              <div className="cycle_name">
                <div className="cycle_name_left">
                  <div className="partners">
                    <p>Partners</p>
                    <h5>
                      <span>
                        <img
                          src={img6}
                          alt="user_icon"
                          className="userd_icon"
                        />
                      </span>
                      {Number(result200)}
                    </h5>
                  </div>
                </div>

                <div className="Total_revenue">
                  <p>Total Direct revenue</p>
                  <h5>
                    {box200 ? ((200 - 200 * 0.15) / 2) * box200 : "0.00"} USDT
                  </h5>
                  {/* <span><img src={img4} alt='user_icon' className='userd_icon' /></span> */}
                </div>
              </div>
            </div>
            <div className="tabls">
              <table className="table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Date</th>
                    <th>ID</th>
                    
                    <th>Wallet</th>
                    <th>USDT</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData &&
                    tableData.map((item, index) => {
                      return (
                        <>
                        <tr key={index}>
                          <td>
                            <span className="users_icon">
                              <i className="fa fa-user" aria-hidden="true"></i>
                            </span>
                          </td>
                          <td>{item.createdAt}</td>
                          <td>
                            <Link className="link_table link_table2">
                             {item.user_id}
                            </Link>
                          </td>
                          <td>
                            <div className="link_icon">
                              <p>
                                <a href="#" className="link_table">
                                  {item.user_wallet}{" "}
                                  {/* Replace with actual data */}
                                  <span className="files">
                                    <i
                                      className="fa fa-files-o"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <span className="linkIcon">
                                    <i
                                      className="fa fa-link"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </a>
                              </p>
                            </div>
                          </td>
                          <td>
                            {((item.buyed_plan[0].amount -
                              item.buyed_plan[0].amount * 0.15) /
                              2).toFixed(2)}
                          </td>
                        </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Forsage1;
