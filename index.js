"use strict";
import { profiles } from "./mockData.js";

const mockData = profiles.data;

const profile = {};

function promptQuestion(property, question) {
  let answer = null;
  while (answer === null) {
    answer = prompt(question);
    if (property === "first_name" || property === "last_name") {
      if (!answer || !answer.trim()) {
        answer = null;
        alert("Invalid input. Please enter a valid value.");
      }
    } else if (
      property === "age" ||
      property === "min_age_interest" ||
      property === "max_age_interest"
    ) {
      if (!answer || isNaN(answer) || Number(answer) < 18) {
        answer = null;
        alert("Invalid input. Please enter a valid age (minimum age: 18).");
      } else {
        answer = Number(answer);
      }
    } else if (property === "gender" || property === "gender_interest") {
      if (!answer || !["M", "F", "X"].includes(answer.toUpperCase())) {
        answer = null;
        alert("Invalid input. Please enter M, F, or X.");
      }
    } else if (property === "location") {
      if (!answer || !["rural", "city"].includes(answer.toLowerCase())) {
        answer = null;
        alert('Invalid input. Please enter "rural" or "city".');
      }
    }
  }
  profile[property] = answer;
}

function displayProfile(profile) {
  const profileElement = document.getElementById("profile");
  let html = "<h2>Your Profile</h2>";
  html += "<ul>";
  for (const [key, value] of Object.entries(profile)) {
    html += `<li>${key}: ${value}</li>`;
  }
  html += "</ul>";
  profileElement.innerHTML = html;
}

function displayMatches(matches) {
  const matchesElement = document.getElementById("matches");
  let html = "<h2>Matches</h2>";
  if (matches.length === 0) {
    html += "<p>No matches found.</p>";
  } else {
    html += "<ul>";
    matches.forEach((person) => {
      html += `<li>${person.first_name} ${person.last_name}, ${person.age}, ${person.location}</li>`;
    });
    html += "</ul>";
  }
  matchesElement.innerHTML = html;
}

function handleButtonClick() {
  promptQuestion("first_name", "What is your first name?");
  promptQuestion("last_name", "What is your last name?");
  promptQuestion("age", "How old are you? (Minimum age: 18)");
  promptQuestion(
    "min_age_interest",
    "What is the minimum age you are interested in dating? (Minimum age: 18)"
  );
  promptQuestion(
    "max_age_interest",
    "What is the maximum age you are interested in dating?"
  );
  promptQuestion("gender", "What is your gender? (M, F, or X)");
  promptQuestion(
    "gender_interest",
    "What gender are you interested in dating? (M, F, or X)"
  );
  promptQuestion("location", "Are you located in a rural or city area?");

  displayProfile(profile);

  const matches = mockData.filter((person) => {
    return (
      person.age >= profile.min_age_interest &&
      person.age <= profile.max_age_interest &&
      profile.age >= person.min_age_interest &&
      profile.age <= person.max_age_interest &&
      (person.gender_interest === profile.gender ||
        person.gender === profile.gender_interest) &&
      person.location === profile.location
    );
  });

  displayMatches(matches);
}

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", handleButtonClick);
