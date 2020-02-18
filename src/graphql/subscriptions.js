/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote {
    onCreateNote {
      id
      note
      owner
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote {
    onUpdateNote {
      id
      note
      owner
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote {
    onDeleteNote {
      id
      note
      owner
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateSession = /* GraphQL */ `
  subscription OnCreateSession {
    onCreateSession {
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
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession {
    onUpdateSession {
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
export const onDeleteSession = /* GraphQL */ `
  subscription OnDeleteSession {
    onDeleteSession {
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
export const onCreateMedicalTranscript = /* GraphQL */ `
  subscription OnCreateMedicalTranscript {
    onCreateMedicalTranscript {
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
export const onUpdateMedicalTranscript = /* GraphQL */ `
  subscription OnUpdateMedicalTranscript {
    onUpdateMedicalTranscript {
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
export const onDeleteMedicalTranscript = /* GraphQL */ `
  subscription OnDeleteMedicalTranscript {
    onDeleteMedicalTranscript {
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
export const onCreateTextTranscript = /* GraphQL */ `
  subscription OnCreateTextTranscript {
    onCreateTextTranscript {
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
export const onUpdateTextTranscript = /* GraphQL */ `
  subscription OnUpdateTextTranscript {
    onUpdateTextTranscript {
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
export const onDeleteTextTranscript = /* GraphQL */ `
  subscription OnDeleteTextTranscript {
    onDeleteTextTranscript {
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
export const onCreateQuestion = /* GraphQL */ `
  subscription OnCreateQuestion {
    onCreateQuestion {
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
export const onUpdateQuestion = /* GraphQL */ `
  subscription OnUpdateQuestion {
    onUpdateQuestion {
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
export const onDeleteQuestion = /* GraphQL */ `
  subscription OnDeleteQuestion {
    onDeleteQuestion {
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
export const onCreateSymptom = /* GraphQL */ `
  subscription OnCreateSymptom {
    onCreateSymptom {
      id
      name
      description
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateSymptom = /* GraphQL */ `
  subscription OnUpdateSymptom {
    onUpdateSymptom {
      id
      name
      description
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteSymptom = /* GraphQL */ `
  subscription OnDeleteSymptom {
    onDeleteSymptom {
      id
      name
      description
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
