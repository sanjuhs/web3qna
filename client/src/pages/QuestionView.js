import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { InjectedConnector } from "wagmi/connectors/injected";
import {
  useAccount,
  useConnect,
  useContract,
  useSigner,
  useContractEvent,
} from "wagmi";
import { Link } from "react-router-dom";
import { makeStorageClient } from "../ipfs/ipfs";
import mintABI from "../abi/mintABI.json";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

function QuestionView() {
  const contractAddress = "0xCc1BCFeD69A41C48357259606EEb5cf91137B0dB";

  const { data: signer, isError, isLoading } = useSigner();

  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: mintABI.abi,
    signerOrProvider: signer,
  });

  const [question, addQuestion] = useState([]);
  const [answer, changeAnswer] = useState();

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const loadQuestions = async () => {
    const qID =
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ];
    try {
      const res = await axios.get(
        `https://web3qna.herokuapp.com/api/v1/questions/getQuestionByID/${qID}`
      );
      const questions = res.data;
      console.log(questions);
      addQuestion(questions);
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const updateAnswer = (e) => {
    changeAnswer(e.target.value);
  };

  const submitAnswer = async () => {
    try {

      const id =
        window.location.href.split("/")[
          window.location.href.split("/").length - 1
        ];

      const obj = {
        title: question.title,
        description: question.description,
        answeText: answer,
      };

      const blob = new Blob([JSON.stringify(obj)], {
        type: "application/json",
      });

      const file1 = [new File([blob], `${id}.json`)];

      const client = makeStorageClient();
      let cid = await client.put(file1);
      let cidURL = "https://ipfs.io/ipfs/" + cid;
      console.log("stored files with cid:", cid);

      const result = await contract.mintAndReward(address, id, cidURL);
      

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        qid: question._id,
        postedBy: address,
        answerText: answer,
      };

      const res = await axios.post(
        "https://web3qna.herokuapp.com/api/v1/questions/addAnswer",
        body,
        config
      );

      alert("Success ! Reward will be credited to your acc");

      loadQuestions();
      changeAnswer("");

      

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <Link to="/">
        <div className="m-4">
        <button className="bg-[#A10035] text-white rounded-xl px-2 py-px md:px-4 lg:px-4 md:py-2 lg:py-2 text-sm md:text-base lg:text-base"> All Questions</button>
        </div>
      </Link>

      <section className="my-4 flex flex-col w-full px-4 md:px-72 lg:px-72">
        {question ? (
          <div className="flex flex-col justify-center">
            <div className="border-b-2 pb-16">
            <h1 className="font-bold text-2xl mb-4">{question.title}</h1>
            <p>{question.description}</p>
            </div>
          </div>
        ): (
          <Loader/>
        )
      }

        {/* <h2 className="my-4 text-xl font-bold">Answers</h2> */}

        {
          question.answers && question.answers.length===0 && (
            <h2 className="text-xl text-slate-400 my-16">No Answers yet. Add your answer below</h2>
          )
        }

        {question.answers ? (
          question.answers.map((answer, index) => {
            return (
              <div key={index} className="px-8 py-8 my-4 bg-[#F9F9F9] drop-shadow border">
                <p className="font-bold">Posted By{answer.postedBy.substring(0, 4)} ..</p>
                <p>{answer.answerText}</p>
              </div>
            );
          }) ) :(
            <Loader/>
          )
        
        }

        <h2 className="mt-8">Add your answer</h2>
        <textarea
          className="border border-2 rounded-xl p-4 h-48"
          onChange={(e) => updateAnswer(e)}
          value={answer}
        ></textarea>
        <button onClick={submitAnswer} className="bg-neutral-400 w-48 my-4 text-center">
          Submit
        </button>
      </section>
      <Footer/>
    </div>
  );
}

export default QuestionView;
