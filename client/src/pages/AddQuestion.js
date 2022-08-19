import React from "react";
import Navbar from "../components/Navbar";
import { useFormik } from "formik";
import { InjectedConnector } from "wagmi/connectors/injected";
import {
  useAccount,
  useConnect,
  useContract,
  useSigner,
  useContractEvent,
} from "wagmi";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { makeStorageClient } from "../ipfs/ipfs";
import mintABI from "../abi/mintABI.json";
import Footer from "../components/Footer";

function AddQuestion() {
  const contractAddress = "0xCc1BCFeD69A41C48357259606EEb5cf91137B0dB";

  const { data: signer, isError, isLoading } = useSigner();

  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: mintABI.abi,
    signerOrProvider: signer,
  });

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: async (values) => {
      const userData = JSON.stringify(values, null, 2);
      console.log("userdata", userData);

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = {
          title: formik.values.title,
          description: formik.values.description,
          postedBy: address,
        };

        const res = await axios.post(
          "https://web3qna.herokuapp.com/api/v1/questions/addQuestion",
          body,
          config
        );

        const id = res.data._id;

        //storage nft in IPFS and give reward
        const obj = values;
        const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })

        const file1 = [new File([blob], `${id}.json`)];

        const client = makeStorageClient()
        let cid = await client.put(file1)
        let cidURL = "https://ipfs.io/ipfs/" + cid;
        console.log('stored files with cid:', cid)

        const result = await contract.mintAndReward(address, id, cidURL);
        alert('Success ! Reward will be credited to your acc');

        navigate("/", { replace: true });
      } catch (error) {
        console.log(error);
        alert("server error");
      }
    },
  });

  return (
    <div className="flex flex-col">
      <Navbar />
      <Link to="/">
        <div className="m-4">
        <button className="bg-[#A10035] text-white rounded-xl px-2 py-px md:px-4 lg:px-4 md:py-2 lg:py-2 text-sm md:text-base lg:text-base"> All Questions</button>
        </div>
      </Link>
      <div className="flex flex-col items-center my-16">
        <h1 className="font-bold text-2xl mb-8 text-left">Add Question</h1>
        <form className="flex flex-col w-full px-4" onSubmit={formik.handleSubmit}>
          <label htmlFor="title" className="">
            Enter title
          </label>
          <textarea
            className="md:w-96 lg:w-96 mt-2 mb-4 px-4 py-2 rounded-2xl border border-black"
            type="text"
            name="title"
            value={formik.values.title}
            autoComplete="off"
            onChange={formik.handleChange}
          ></textarea>

          <label htmlFor="description" className="">
            Enter Description
          </label>
          <textarea
            className="md:w-96 lg:w-96  mt-2 mb-4 px-4 py-2 rounded-2xl border border-black"
            type="text"
            name="description"
            value={formik.values.description}
            autoComplete="off"
            onChange={formik.handleChange}
          ></textarea>

          <button
            type="submit"
            className="md:w-72 lg:w-72 mt-4 px-4 py-2 bg-[#E9C46A] text-[#264653] rounded-xl"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default AddQuestion;
