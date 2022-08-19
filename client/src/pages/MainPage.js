import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

function MainPage() {
  const [questions, addQuestions] = useState([]);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await axios.get(
          "https://web3qna.herokuapp.com/api/v1/questions/getAllQuestions"
        );
        const questions = res.data;
        console.log(questions);
        addQuestions(questions);
      } catch (error) {
        console.log(error);
        alert("Server error");
      }
    };

    loadQuestions();
  }, []);

  return (
    <div className="flex flex-col">
      <Navbar />
      <section className="px-4 py-4">
        <div className="flex flex-row justify-between items-center px-4 md:pl-72 lg:pl-72 md:pr-72 lg:pr-72 md:py-8 lg:py-8">
          <h1 className="text-left md:text-3xl lg:text-3xl font-bold">
            Questions
          </h1>
          <Link to="/addQuestion">
            <button className="bg-[#A10035] text-white px-4 py-2 rounded-xl">
              New Question
            </button>
            {/* <p className="underline">Add New Question</p> */}
          </Link>
        </div>

        <div className="w-full md:px-72 lg:px-72 flex flex-col justify-start text-left">
          {questions ? (
            questions.map((question) => {
              return (
                <div
                  key={question._id}
                  className="flex flex-col px-8 py-8 my-4 bg-[#F9F9F9] drop-shadow border"
                >
                  <Link to={`/question/${question._id}`}>
                    <h2 className="text-base font-bold">{question.title}</h2>
                    <p>{question.description}</p>
                  </Link>
                </div>
              );
            })
          ) : (
            <Loader/>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MainPage;
