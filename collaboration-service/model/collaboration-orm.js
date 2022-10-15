import {
  createCollaboration,
  findCollaboration,
  removeCollab,
} from "./collaboration-repository.js";

export const ormInitiateCollaboration = async ({
  roomId,
  roomDifficulty,
  question,
  questionTitle,
}) => {
  // const response = await request(
  //   "http://localhost:8002/api/question?difficulty=" + roomDifficulty
  // );
  // const questionJSON = JSON.parse(response.body).data;
  // const newCollab = await createCollaboration({
  //   roomId,
  //   roomDifficulty,
  //   question: questionJSON.question_content,
  //   questionTitle: questionJSON.question_content,
  // });
  const newCollab = await createCollaboration({
    roomId,
    roomDifficulty,
    question,
    questionTitle,
  });
  console.log(newCollab);
  await newCollab.save();
  return newCollab;
};
