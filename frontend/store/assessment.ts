import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ParticipantData {
  name: string
  email: string
  phone?: string
  testDate?: string
}

interface AssessmentState {
  participant: ParticipantData | null
  answers: Record<number, { most: string; least: string }>
  setParticipant: (data: ParticipantData) => void
  setAnswer: (groupId: number, type: 'most' | 'least', statementId: string) => void
  clearAssessment: () => void
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set) => ({
      participant: null,
      answers: {},
      setParticipant: (data) => set({ participant: data }),
      setAnswer: (groupId, type, statementId) =>
        set((state) => ({
          answers: {
            ...state.answers,
            [groupId]: {
              ...state.answers[groupId],
              [type]: statementId,
            },
          },
        })),
      clearAssessment: () => set({ participant: null, answers: {} }),
    }),
    {
      name: 'disc-assessment-storage',
    }
  )
)
