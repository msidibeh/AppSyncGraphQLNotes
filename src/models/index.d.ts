import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Note {
  readonly id: string;
  readonly note?: string;
  readonly owner?: string;
  constructor(init: ModelInit<Note>);
  static copyOf(source: Note, mutator: (draft: MutableModel<Note>) => MutableModel<Note> | void): Note;
}

export declare class Session {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
  readonly questions?: Question[];
  constructor(init: ModelInit<Session>);
  static copyOf(source: Session, mutator: (draft: MutableModel<Session>) => MutableModel<Session> | void): Session;
}

export declare class Question {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly session?: Session;
  constructor(init: ModelInit<Question>);
  static copyOf(source: Question, mutator: (draft: MutableModel<Question>) => MutableModel<Question> | void): Question;
}

export declare class MedicalTranscript {
  readonly id: string;
  readonly entities?: string;
  readonly unmappedAttributes?: string;
  readonly modelVersion?: string;
  constructor(init: ModelInit<MedicalTranscript>);
  static copyOf(source: MedicalTranscript, mutator: (draft: MutableModel<MedicalTranscript>) => MutableModel<MedicalTranscript> | void): MedicalTranscript;
}

export declare class TextTranscript {
  readonly id: string;
  readonly jobName?: string;
  readonly accountId?: string;
  readonly results?: string;
  readonly status?: string;
  readonly transcriptionText?: string;
  constructor(init: ModelInit<TextTranscript>);
  static copyOf(source: TextTranscript, mutator: (draft: MutableModel<TextTranscript>) => MutableModel<TextTranscript> | void): TextTranscript;
}

export declare class Symptom {
  readonly id: string;
  readonly name?: string;
  readonly description?: string;
  constructor(init: ModelInit<Symptom>);
  static copyOf(source: Symptom, mutator: (draft: MutableModel<Symptom>) => MutableModel<Symptom> | void): Symptom;
}