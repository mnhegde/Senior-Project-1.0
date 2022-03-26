import { logging, PersistentMap } from 'near-sdk-as'


const candidateURL = new PersistentMap<string, string>("CandidateURL");
const candidatePair = new PersistentMap<string, string[]>("Candidate Pair");
const promptArray = new PersistentMap<string, string[]>("Array of Prompts");
const voteArray = new PersistentMap<string, i32[]>("Storing of Votes");
const userParticipation = new PersistentMap<string, string[]>("User Participation");


//View Methods - Fetching or viewing information on blockchain (no transaction fee)
export function getURL(name: string):string {
  if(candidateURL.contains(name))
    return candidateURL.getSome(name);
  return "";
}

export function checkParticipation(prompt: string, user: string):bool {
  if(userParticipation.contains(prompt)) {
    let arr = userParticipation.getSome(prompt);
    return arr.includes(user);
  }
  logging.log("This prompt doesn't exist")
  return false;
}

export function getPrompts():string[] {
  if (promptArray.contains("allArrays")) {
    return promptArray.getSome("allArrays");
  }
  logging.log("No Prompts Found")
  return []
}

export function getVotes(prompt: string):i32[] {
  if(voteArray.contains(prompt)) {
    return voteArray.getSome(prompt)
  }
  logging.log("Prompt Not Found")
  return [0, 0]
}

export function getCandidatePair(prompt: string):string[] {
  if(candidatePair.contains(prompt))
    return candidatePair.getSome(prompt)
  else {
    logging.log("Prompt not found");
    return [];
  }
}

//Change Methods - Adds or modifies information on blockchain (transaction fee)
export function addURL(name: string, url: string):void {
  candidateURL.set(name, url);
  logging.log("URL added for " + name);
}

export function addCandidatePair(prompt: string, name1: string, name2: string):void {
  candidatePair.set(prompt, [name1, name2]);
}

export function addPrompt(prompt: string):void {
  logging.log("Added prompt to array")
  if(promptArray.contains("allArrays")) {
    let arr = promptArray.getSome("allArrays");
    arr.push(prompt);
    promptArray.set("allArrays", arr);
  } else {
    promptArray.set("allArrays", [prompt]);
  }
}

export function addVote(prompt: string, index: i32):void {
  if(voteArray.contains(prompt)) {
      let arr = voteArray.getSome(prompt);
      arr[index] += 1;
      voteArray.set(prompt, arr);
  } else {
    let arr = [0,0];
    arr[index] = 1;
    voteArray.set(prompt, arr);
  }
}

export function checkUserRecord(prompt: string, user: string):void {
  if(userParticipation.contains(prompt)) {
    let arr = userParticipation.getSome(prompt);
    arr.push(user);
    userParticipation.set(prompt, arr);
  } else {
    userParticipation.set(prompt, [user]);
  }
}

