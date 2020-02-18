/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      note
      owner
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      note
      owner
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      note
      owner
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createSession = /* GraphQL */ `
  mutation CreateSession(
    $input: CreateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    createSession(input: $input, condition: $condition) {
      id
      name
      description
      questions {
        items {
          id
          name
          description
          session {
            id
            name
            description
            questions {
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateSession = /* GraphQL */ `
  mutation UpdateSession(
    $input: UpdateSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    updateSession(input: $input, condition: $condition) {
      id
      name
      description
      questions {
        items {
          id
          name
          description
          session {
            id
            name
            description
            questions {
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteSession = /* GraphQL */ `
  mutation DeleteSession(
    $input: DeleteSessionInput!
    $condition: ModelSessionConditionInput
  ) {
    deleteSession(input: $input, condition: $condition) {
      id
      name
      description
      questions {
        items {
          id
          name
          description
          session {
            id
            name
            description
            questions {
              nextToken
              startedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createMedicalTranscript = /* GraphQL */ `
  mutation CreateMedicalTranscript(
    $input: CreateMedicalTranscriptInput!
    $condition: ModelMedicalTranscriptConditionInput
  ) {
    createMedicalTranscript(input: $input, condition: $condition) {
      id
      entities
      unmappedAttributes
      modelVersion
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateMedicalTranscript = /* GraphQL */ `
  mutation UpdateMedicalTranscript(
    $input: UpdateMedicalTranscriptInput!
    $condition: ModelMedicalTranscriptConditionInput
  ) {
    updateMedicalTranscript(input: $input, condition: $condition) {
      id
      entities
      unmappedAttributes
      modelVersion
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteMedicalTranscript = /* GraphQL */ `
  mutation DeleteMedicalTranscript(
    $input: DeleteMedicalTranscriptInput!
    $condition: ModelMedicalTranscriptConditionInput
  ) {
    deleteMedicalTranscript(input: $input, condition: $condition) {
      id
      entities
      unmappedAttributes
      modelVersion
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createTextTranscript = /* GraphQL */ `
  mutation CreateTextTranscript(
    $input: CreateTextTranscriptInput!
    $condition: ModelTextTranscriptConditionInput
  ) {
    createTextTranscript(input: $input, condition: $condition) {
      id
      jobName
      accountId
      results
      status
      transcriptionText
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateTextTranscript = /* GraphQL */ `
  mutation UpdateTextTranscript(
    $input: UpdateTextTranscriptInput!
    $condition: ModelTextTranscriptConditionInput
  ) {
    updateTextTranscript(input: $input, condition: $condition) {
      id
      jobName
      accountId
      results
      status
      transcriptionText
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteTextTranscript = /* GraphQL */ `
  mutation DeleteTextTranscript(
    $input: DeleteTextTranscriptInput!
    $condition: ModelTextTranscriptConditionInput
  ) {
    deleteTextTranscript(input: $input, condition: $condition) {
      id
      jobName
      accountId
      results
      status
      transcriptionText
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
      id
      name
      description
      session {
        id
        name
        description
        questions {
          items {
            id
            name
            description
            session {
              id
              name
              description
              _version
              _deleted
              _lastChangedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
      id
      name
      description
      session {
        id
        name
        description
        questions {
          items {
            id
            name
            description
            session {
              id
              name
              description
              _version
              _deleted
              _lastChangedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
      id
      name
      description
      session {
        id
        name
        description
        questions {
          items {
            id
            name
            description
            session {
              id
              name
              description
              _version
              _deleted
              _lastChangedAt
            }
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createSymptom = /* GraphQL */ `
  mutation CreateSymptom(
    $input: CreateSymptomInput!
    $condition: ModelSymptomConditionInput
  ) {
    createSymptom(input: $input, condition: $condition) {
      id
      name
      description
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateSymptom = /* GraphQL */ `
  mutation UpdateSymptom(
    $input: UpdateSymptomInput!
    $condition: ModelSymptomConditionInput
  ) {
    updateSymptom(input: $input, condition: $condition) {
      id
      name
      description
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteSymptom = /* GraphQL */ `
  mutation DeleteSymptom(
    $input: DeleteSymptomInput!
    $condition: ModelSymptomConditionInput
  ) {
    deleteSymptom(input: $input, condition: $condition) {
      id
      name
      description
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
