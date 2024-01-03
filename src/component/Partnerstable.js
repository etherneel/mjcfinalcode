import React, { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import img1 from "../image/Vector.svg";
import { Link } from "react-router-dom";
import {
  ConnectWallet,
  useContract
} from "@thirdweb-dev/react";

const Partnerstable = () => {
    const [tableData, setTableData] = useState("");
    const fetchData2 = () => {
      const apiUrl = `https://nodes.mjccoin.io/v1/profits?address=${wallet_address}`;
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
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
      fetchData();
      fetchData2();
    };
  useEffect(()=>{
    fetchData2();
  },[])
   
    
     
    // Retrieve data from localStorage
    var storedData = localStorage.getItem('userData');
  
    var userDataReal = JSON.parse(storedData);
  
  
    const wallet_address = userDataReal?.data?.wallet_address;
  
    const { contract } = useContract(
      "0xc1931Dc38541A982da5470f10Bf5C3Ed51F40490"
    );
    const { contract: USDTContract } = useContract(
      "0x9f2C886E49b6851f8488F8818DDBADFd16B13e7a"
    );
    
  
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
                <div className="Total_revenue">
                  <p>Total Direct revenue</p>
                  <h5>
                    {/* {box50 ? ((50 - 50 * 0.15) / 2) * box50 : "0.00"} USDT */}
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
                        <tr key={index}>
                          <td>
                            <span className="users_icon">
                              <i className="fa fa-user" aria-hidden="true"></i>
                            </span>
                          </td>
                          <td>{new Date(item.time).toISOString().split('T')[0]}</td>
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
                            {(item.profit).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        {/* </div> */}

    </React.Fragment>
  )
}

export default Partnerstable