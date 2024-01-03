import plashtfiny from "../image/tiffany-blur.png";
import logo from "../image/Vector.svg";
import icon1 from "../image/icon3.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import {
  useTokenBalance,
  useContract,
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registration = () => {
  const [stackPrice, setStackPrice] = useState("");
  const [mjcstackamount, setMjcStackAmount] = useState("");
  const [mjcStackDuration, setMjcStackDuration] = useState("");
  const [stackReferral, setStackReferral] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  let navigate = useNavigate()
  //   const [referralCode, setReferralCode] = useState("");
  const [spending, setSpending] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [price, setPrice] = useState("");
  const handleReferralChange = (event) => {
    setReferralCode(event.target.value);
  };
  const handleSpendingChange = (event) => {
    setSpending(event.target.value);
  };

  const handleSelectOption = (event) => {
    setSelectedValue(event.target.value);
    //console.log(event.target.value , );
  };

  const handleStackPrice = (event) => {
    setStackPrice(event.target.value);
  };

  const handleStackReferral = (event) => {
    setStackReferral(event.target.value);
  };

  const handleMjcStackAmount = (event) => {
    setMjcStackAmount(event.target.value);
  };

  const handleMjcStackDuration = (event) => {
    setMjcStackDuration(event.target.value);
  };

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get(
          "https://api.dex-trade.com/v1/public/ticker?pair=MJCTUSDT"
        );
        setPrice(response.data.data.last);
      } catch (err) {
        console.log(err);
      }
    };
    fetchedData();
  }, []);

  const result2 = (selectedValue / price).toFixed(0);
  const mjcstackamountValue = (mjcstackamount / price).toFixed(0);
  const newValue = (result2 * 0.15).toFixed(0);
  console.log(newValue, "this is our new value");
  const onFormSubmit = (event) => {
    event.preventDefault();
    // console.log("selectedValue", result);
  };
  const [response, setResponse] = useState(null);
  const [userData, setUserData] = useState(null);
  const [USDTAmt, setUSDTAmt] = useState("");
  const [cunAmt, setCunAmt] = useState("");
  const [withdrawAmt, setWithdrawAmt] = useState("");
  const [approveAmt, setApproveAmt] = useState("");
  const [BuyTokenLoading, setBuyTokenLoading] = useState(false);
  const [directStakeJoiningLoading, setDirectStakeJoiningLoading] =
    useState(false);
    const [StakeLoading, setStakeLoading] =
    useState(false);
  const [SellTokensloading, setSellTokensLoading] = useState(false);
  const [WithdrawTokensloading, setWithdrawTokensLoading] = useState(false);
  const [ApproveTokensloading, setApproveTokensLoading] = useState(false);
  const referralLinkRef = useRef(null);
  const [referralCode, setReferralCode] = useState("");
  const [BTCprice, setBTCPrice] = useState("");
  const [BNBprice, setBNBPrice] = useState("");
  const isValidUSDTamount = Number(USDTAmt) >= 20 || USDTAmt == "";

  useEffect(() => {
    const fetchedbtcprice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );

        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        const result = await response.json();
        setBTCPrice(result.bitcoin.usd);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedbtcprice();
  }, []);

  useEffect(() => {
    const fetchedbnbprice = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
        );

        if (!response.ok) {
          throw new Error("Response is not ok");
        }
        const result = await response.json();
        setBNBPrice(result.binancecoin.usd);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedbnbprice();
  }, []);

  var storedData = localStorage.getItem("userID");
  var userDataID = JSON.parse(storedData);
 //console.log(userDataID , " this is  user_id");
  //read functions
  const address = useAddress();
  const { contract } = useContract(
    "0xc1931Dc38541A982da5470f10Bf5C3Ed51F40490"
  );
  const { data: cunWalletBal, isLoading: isCunWalletBalLoading } =
    useTokenBalance(contract, address);
  const { contract: USDTContract } = useContract(
    "0x9f2C886E49b6851f8488F8818DDBADFd16B13e7a"
  );
  const { data: walletBal, isLoading: walletBalLoading } = useTokenBalance(
    USDTContract,
    address
  );
  
  const { data: parent, isLoading: isParentLoading } = useContractRead(
    contract,
    "getParent",
    [address]
  );
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((value, key) => {
      setReferralCode(`${value}`);
    });
  }, []);

  //approve tokens
  const { mutateAsync: approve, isLoading: isApproveLoading } =
    useContractWrite(USDTContract, "approve");

  const handleCopyReferralLink = () => {
    if (referralLinkRef.current) {
      referralLinkRef.current.select();
      document.execCommand("copy");
      window.getSelection().removeAllRanges();

      // Use react-toastify to display a toaster notification
      toast.success("Referral link copied to clipboard!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const approveTokens = async () => {
    setApproveTokensLoading(true);
    try {
      let spender = "0xc1931Dc38541A982da5470f10Bf5C3Ed51F40490"; //contract address
      let approveAmount = ethers.utils.parseEther(spending);
      const data = await approve({ args: [spender, approveAmount] });
      console.info("contract call successs", data);
      setApproveTokensLoading(false);
      toast.success("Successfully approved tokens!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      toast.error("Approve Failed !", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("contract call failure", err);
    } finally {
      setApproveAmt("");
      setApproveTokensLoading(false);
    }
  };

  // posting id

  const postingData = async (previewID) => {
    console.log(previewID , "this is a preview id")
    try {
      const response = await fetch('https://nodes.mjccoin.io/v1/alldetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: previewID }),
      });
      const data = await response.json();
      console.log(data , " this is posting  data");
      localStorage.setItem("userData", JSON.stringify(data));
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };


  // buyTokens
  const { mutateAsync: buyTokens, isLoading: isBuyTokensLoading } =
    useContractWrite(contract, "buyTokens");

  const { mutateAsync: DirectStakeJoining, isLoading: isJoiningLoading } =
    useContractWrite(contract, "DirectStakeJoining");
  const { mutateAsync: stakeTokens, isLoading: isStakeLoading } =
    useContractWrite(contract, "stakeTokens");

  const buyToken = async () => {
    
    setBuyTokenLoading(true);
    try {
      let ref;
      if (parent === "0x0000000000000000000000000000000000000000") {
        ref = "0xd70025ecB0ff99D4405f523ccf5Fe302c72325d3";
      } else {
        ref = parent;
      }

      let usdtAmt = result2;
      //   let usdtAmt = ethers.utils.parseEther(result2);

      const data = await buyTokens({
        args: [ref, usdtAmt.toString(), selectedValue],
      });
      console.info("contract call successs", data);
      await fetch("https://nodes.mjccoin.io/v1/plan-buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_wallet: address,
          buyed_plan: [{ amount: selectedValue }],
          parent_wallet_id: ref,
          user_id: userDataID,
        }),
      });
     // stakeMjcTokens();
      setBuyTokenLoading(false);
      toast.success(
        "Tokens Bought Successfully",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      await postingData(userDataID)
      navigate('/dashboard')
    } catch (err) {
      toast.error("You can not buy more than $1000 in one transaction", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("contract call failure", err);
    } finally {
      setUSDTAmt("");
      setBuyTokenLoading(false);
    }
  };

  const DirectStakeJoinings = async () => {
    setDirectStakeJoiningLoading(true);
    try {
      let ref;
      if (referralCode === "0x0000000000000000000000000000000000000000") {
        ref = referralCode;
      } else {
        ref = referralCode;
      }
      let usdtAmt = result2.toString();

      const data = await DirectStakeJoining({
        args: [stackReferral, usdtAmt],
      });
      setDirectStakeJoiningLoading(false);

      console.info("contract call successs", data);

      toast.success("Tokens Bought Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      toast.error("You can not buy more than $1000 in one transaction", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("contract call failure", err);
    } finally {
      setUSDTAmt("");
      setDirectStakeJoiningLoading(false);
    }
  };

 const postingSteckTokens = async(user_id , ammount)=>{
      try {
        let data = await fetch('https://nodes.mjccoin.io/steck/post-token' ,{
          method: "POST",
          headers :{
            "Content-Type": "application/json",
          },
          body : JSON.stringify({user_id: user_id , tokensteck_amount: ammount})
        })
        let response = data.json() 
        console.log(response)
      } catch (error) {
        console.log(error);
      }
 }


 let ref;
 if (parent === "0x0000000000000000000000000000000000000000") {
   ref = "0xd70025ecB0ff99D4405f523ccf5Fe302c72325d3";
 } else {
   ref = parent;
 }

 console.log(ref)

  const stakeMjcTokens = async () => {
    setStakeLoading(true);
    try {
      // let ref;
      // if (parent === "0x0000000000000000000000000000000000000000") {
      //   ref = referralCode;
      // } else {
      //   ref = parent;
      // }
      let usdtAmt = result2;
      const data = await stakeTokens({
        args: [newValue.toString(), 365, 0],
      });
      setStakeLoading(false);
      await postingSteckTokens(userDataID , newValue)
      
      toast.success("Tokens Staked Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
     
      window.location.reload();
    } catch (err) {
      toast.error("Something went wrong..Try again", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("contract call failure", err);
    } finally {
      setUSDTAmt("");
      //setDirectStakeJoiningLoading(false);
    }
  };

  const handleUserWallet = async () => {
    try {
      let dumy = await fetch("https://nodes.mjccoin.io/v1/allDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: referralCode }),
      });
      let response = await dumy.json();
      if (!response) {
        // setLoading(true)
      } else {
        setReferralCode(response.data.wallet_address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //sell Token
  const { mutateAsync: sellTokens, isLoading: isSellTokenLoading } =
    useContractWrite(contract, "sellTokens");

  const sellToken = async () => {
    try {
      setSellTokensLoading(true);
      let amount = ethers.utils.parseEther(cunAmt);
      const data = await sellTokens({ args: [amount] });
      console.info("contract call successs", data);
      toast.success("Tokens sold successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      toast.error("Selling amount exceeds limit", {
        position: toast.POSITION.TOP_CENTER,
      });

      console.error("contract call failure", err);
    } finally {
      setCunAmt("");
      setSellTokensLoading(false);
    }
  };

  //withdraw Tokens
  const { mutateAsync: withdraw, isLoading: isWithdrawTokensLoading } =
    useContractWrite(contract, "withdraw");

  const withdrawToken = async () => {
    try {
      setWithdrawTokensLoading(true);
      let amount = ethers.utils.parseEther(withdrawAmt);
      const data = await withdraw({ args: [amount] });
      console.info("contract call successs", data);
      toast.success("Tokens Has Been Successfully Withdrawn", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      toast.error("Tokens Withdraw Failed", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("contract call failure", err);
    } finally {
      setWithdrawAmt("");
      setWithdrawTokensLoading(false);
    }
  };

  const postData = async (userId) => {
    // const userId = 27;
    const apiUrl = "https://nodes.mjccoin.io/v1/alldetails";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResponse(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    postData(userDataID);
  }, []);

  const numberOfElements = 12; // Change this to the desired number of elements

  const blueElements = Array.from({ length: numberOfElements }, (_, index) => (
    <div key={index} className="forsage_blue"></div>
  ));

  return (
    <div className="regi_main">
      <div style={{ zIndex: 99999999 }}>
        <ToastContainer />
      </div>

      {/* <img src={blueflase} className="bludeflasereg" alt="blueflase" /> */}
      <div className="container">
        <div className="main_top_logo">
          <div className="logos_landing">
            <span>
              <img src={logo} alt="logos" className="logolanding" />
            </span>
          </div>

          <div className="smart_chains">
            <div className="smart_chain_1">
              <spna>
                <img
                  src={icon1}
                  alt="smart_chain"
                  className="smart_chain_icon"
                />
              </spna>
              <p>Smart Chain</p>
            </div>

            <div className="connect_btn">
              <button>
                 <Link to="/">Back </Link>
              </button>
            </div>
          </div>
        </div>
        {ApproveTokensloading && <Loading />}
        {BuyTokenLoading && <Loading />}
        {directStakeJoiningLoading && <Loading />}
        {StakeLoading && <Loading />}

        <div className="registion_from">
          <div className="row">
            <div className="col-lg-6">
              <div className="regis_left">
                <h2>Registration On <br></br> MJC Platform</h2>

                <div className="input_upline">
                  <h5>Your Referral Address</h5>
                  <input
                    type="text"
                    className="you_pline_input"
                    value={ref}
                    onChange={handleReferralChange}
                  />

                  <div className="wllet_condition">
                    <p>
                      <button onClick={() => handleTabClick("home")}>
                        <span className="check_icon">
                          <i
                            className={`fa fa-check ${activeTab === "home" ? "activeTabText" : ""}`}
                            aria-hidden="true"
                          ></i>
                        </span>
                        <span className={`tabText ${activeTab === "home" ? "activeTabText" : ""}`}>
                          Buy Tokens
                        </span>
                      </button>
                    </p>
                    <p>
                      <button onClick={() => handleTabClick("menu1")}>
                        <span className="check_icon">
                          <i
                            className={`fa fa-check ${activeTab === "menu1" ? "activeTabText" : ""
                              }`}
                            aria-hidden="true"
                          ></i>
                        </span>
                        <span className={`tabText ${activeTab === "menu1" ? "activeTabText" : ""}`}>
                        Direct Staking
                        </span>
                      </button>
                    </p>
                    <p>
                      <button onClick={() => handleTabClick("menu2")}>
                        <span className="check_icon">
                          <i
                            className={`fa fa-check ${activeTab === "menu2" ? "activeTabText" : ""
                              }`}
                            aria-hidden="true"
                          ></i>
                        </span>
                        <span className={`tabText ${activeTab === "menu2" ? "activeTabText" : ""}`}>
                        MJC Stake Joining
                        </span>
                      </button>
                    </p>
                  </div>

                  <div className="chech_agin_btn">
                    <button onClick={() => handleUserWallet()}>
                      Fill Parent
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="regis_right"
                style={{
                  backgroundImage: `url(${plashtfiny})`,
                  backgroundSize: "cover",
                }}
              >
                <div className="top_section_reg">
                  <div className="spending">
                    <p>Enter spending</p>
                    <input
                      type="number"
                      className="buy_mjc_input"
                      value={spending}
                      onChange={handleSpendingChange}
                    />

                    <button onClick={approveTokens} className="buy_button_MJC">
                      Approve MJC Tokens
                    </button>
                  </div>
                  <div className="tab-content">
                    <div
                      id="home"
                      className={`container tab-pane ${activeTab === "home" ? "active" : "fade"
                        }`}
                    >
                      <div className="buy_token_card">
                        <h1>Buy MJC Tokens</h1>

                        <form onSubmit={onFormSubmit}>
                          <div className="buy_mjc_one_input">
                            <p>Enter referrer wallet address</p>
                            <input
                              required
                              type="text"
                              className="buy_mjc_input"
                              value={ref}
                              onChange={handleReferralChange}
                            />
                          </div>
                          <div className="buy_mjc_one_input">
                            <p>Buy plan</p>
                            <select
                              id="Buy_plan_mjc"
                              name="Buy_plan_mjc"
                              value={selectedValue}
                              onChange={handleSelectOption}
                            >
                              <option required value="">
                                Select Your Plan
                              </option>
                              <option value="0.1">0.1</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                              <option value="200">200</option>
                              <option value="500">500</option>
                              <option value="1000">1000</option>
                            </select>
                          </div>
                          <p>You must have {result2} MJC Tokens</p>
                          <button
                            onClick={buyToken}
                            type="submit"
                            className="buy_button_MJC"
                          >
                            {" "}
                            Purchase tokens
                          </button>
                        </form>
                      </div>
                    </div>
                    <div
                      id="menu1"
                      className={`container tab-pane ${activeTab === "menu1" ? "active" : "fade"
                        }`}
                    >
                      <div className="buy_token_card">
                        <h1>Direct Staking</h1>

                        <div className="buy_mjc_one_input">
                          <p>Enter referrer wallet address</p>
                          <input
                            onChange={handleStackReferral}
                            value={stackReferral}
                            type="text"
                            className="buy_mjc_input"
                          />
                        </div>

                        <div className="buy_mjc_one_input">
                          <p>Enter amount</p>
                          <input
                            onChange={handleStackPrice}
                            value={stackPrice}
                            type="text"
                            className="buy_mjc_input"
                          />
                        </div>

                        <button
                          onClick={DirectStakeJoinings}
                          type="submit"
                          className="buy_button_MJC"
                        >
                          {" "}
                          Direct Stake
                        </button>
                      </div>
                    </div>
                    <div
                      id="menu2"
                      className={`container tab-pane ${activeTab === "menu2" ? "active" : "fade"
                        }`}
                    >
                      <div className="buy_token_card">
                        <h1>MJC Stake Joining</h1>

                        <div className="buy_mjc_one_input">
                          <p>Enter amount in $</p>
                          <input
                            value={mjcstackamount}
                            onChange={handleMjcStackAmount}
                            type="number"
                            className="buy_mjc_input"
                          />
                          <p>$ worth MJCT : {mjcstackamountValue}</p>
                        </div>

                        <div className="buy_mjc_one_input">
                          <p>Enter duration</p>
                          <select
                            value={mjcStackDuration}
                            onChange={handleMjcStackDuration}
                            id="Buy_plan_mjc"
                            name="Buy_plan_mjc"
                          >
                            <option>Select Duration</option>
                            <option value="90">90</option>
                            <option value="180">180</option>
                            <option value="360">360</option>
                          </select>
                        </div>

                        <button
                          onClick={stakeMjcTokens}
                          className="buy_button_MJC"
                        >
                          Stake tokens
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <h2> <span className='info_circle_icon'><i className="fa fa-info-circle" aria-hidden="true"></i></span>Information</h2>
                                    <p>Insufficient balance for registration.
                                        Registration requires 10.9 BUSD and at least 0.005 BNB.  Your wallet balance: 0.00 BUSD and 0.000 BNB.</p>

                                    <button className='read_guid_reg'>Read guide</button>

                                    <div className='video_playe_you'>
                                        <iframe width="100%" height="200" src="https://www.youtube.com/embed/tgbNymZ7vqY">
                                        </iframe>
                                    </div>

                                    <div className='need_help'>
                                        <h5>
                                            <span className='message_icon'><i className="fa fa-commenting-o" aria-hidden="true"></i></span>
                                            Need help with registration? <br></br>
                                           <span className='message2'>Talk to experts in the support chat</span> </h5>
                                    </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
