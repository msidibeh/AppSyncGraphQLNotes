export const schema = {
    "models": {
        "Note": {
            "syncable": true,
            "name": "Note",
            "pluralName": "Notes",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ],
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "note": {
                    "name": "note",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "owner": {
                    "name": "owner",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "Session": {
            "syncable": true,
            "name": "Session",
            "pluralName": "Sessions",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ],
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "questions": {
                    "name": "questions",
                    "isArray": true,
                    "type": {
                        "model": "Question"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "session"
                    }
                }
            }
        },
        "Question": {
            "syncable": true,
            "name": "Question",
            "pluralName": "Questions",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ],
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "session": {
                    "name": "session",
                    "isArray": false,
                    "type": {
                        "model": "Session"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "questionSessionId"
                    }
                }
            }
        },
        "MedicalTranscript": {
            "syncable": true,
            "name": "MedicalTranscript",
            "pluralName": "MedicalTranscripts",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ],
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "entities": {
                    "name": "entities",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "unmappedAttributes": {
                    "name": "unmappedAttributes",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "modelVersion": {
                    "name": "modelVersion",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "TextTranscript": {
            "syncable": true,
            "name": "TextTranscript",
            "pluralName": "TextTranscripts",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ],
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "jobName": {
                    "name": "jobName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "accountId": {
                    "name": "accountId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "results": {
                    "name": "results",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "transcriptionText": {
                    "name": "transcriptionText",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "Symptom": {
            "syncable": true,
            "name": "Symptom",
            "pluralName": "Symptoms",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ],
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        }
    },
    "enums": {},
    "version": "f617c6959eb53c5e6b7b9a02216d6f0a"
};