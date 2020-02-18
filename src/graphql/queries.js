/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncNotes = /* GraphQL */ `
  query SyncNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        note
        owner
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      note
      owner
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        note
        owner
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSessions = /* GraphQL */ `
  query SyncSessions(
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSessions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getSession = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
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
export const listSessions = /* GraphQL */ `
  query ListSessions(
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncMedicalTranscripts = /* GraphQL */ `
  query SyncMedicalTranscripts(
    $filter: ModelMedicalTranscriptFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMedicalTranscripts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        entities
        unmappedAttributes
        modelVersion
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getMedicalTranscript = /* GraphQL */ `
  query GetMedicalTranscript($id: ID!) {
    getMedicalTranscript(id: $id) {
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
export const listMedicalTranscripts = /* GraphQL */ `
  query ListMedicalTranscripts(
    $filter: ModelMedicalTranscriptFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedicalTranscripts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        entities
        unmappedAttributes
        modelVersion
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTextTranscripts = /* GraphQL */ `
  query SyncTextTranscripts(
    $filter: ModelTextTranscriptFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTextTranscripts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getTextTranscript = /* GraphQL */ `
  query GetTextTranscript($id: ID!) {
    getTextTranscript(id: $id) {
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
export const listTextTranscripts = /* GraphQL */ `
  query ListTextTranscripts(
    $filter: ModelTextTranscriptFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTextTranscripts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncQuestions = /* GraphQL */ `
  query SyncQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncQuestions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
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
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncSymptoms = /* GraphQL */ `
  query SyncSymptoms(
    $filter: ModelSymptomFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSymptoms(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getSymptom = /* GraphQL */ `
  query GetSymptom($id: ID!) {
    getSymptom(id: $id) {
      id
      name
      description
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listSymptoms = /* GraphQL */ `
  query ListSymptoms(
    $filter: ModelSymptomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSymptoms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
