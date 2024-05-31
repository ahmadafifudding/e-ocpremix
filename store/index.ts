import { create } from 'zustand'

type FormData = {
  branch: string
  district: string
  lane: string
  quarry: string
  route: string
  section: string
  typeOfTreatment: string
  date: Date
  length: number
  width: number
  depth: number
  density: number
  description: string
}

type State = {
  formData: FormData
}
type Actions = {
  setFormData: (data: Partial<FormData>) => void
}

const initialState: State = {
  formData: {
    branch: '',
    district: '',
    lane: '',
    quarry: '',
    route: '',
    section: '',
    typeOfTreatment: '',
    date: new Date(),
    length: 0,
    width: 0,
    depth: 0,
    density: 0,
    description: '',
  },
}

export const useFormStore = create<State & Actions>(set => ({
  ...initialState,
  setFormData: data =>
    set(state => ({ ...state, formData: { ...state.formData, ...data } })),
}))
