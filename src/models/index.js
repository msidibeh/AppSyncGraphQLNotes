// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Note, Session, Question, MedicalTranscript, TextTranscript, Symptom } = initSchema(schema);

export {
  Note,
  Session,
  Question,
  MedicalTranscript,
  TextTranscript,
  Symptom
};