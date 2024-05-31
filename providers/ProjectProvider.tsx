import { PropsWithChildren, createContext, useContext } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateProjectSchema, createProjectSchema } from '@/validations'

const ProjectContext = createContext<
  UseFormReturn<CreateProjectSchema> | undefined
>(undefined)

export function ProjectProvider({ children }: PropsWithChildren) {
  const project = useForm<CreateProjectSchema>({
    defaultValues: {
      branch: '',
      district: '',
    },
    resolver: zodResolver(createProjectSchema),
  })

  return (
    <ProjectContext.Provider value={project}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProject = (): UseFormReturn<CreateProjectSchema> => {
  const context = useContext(ProjectContext)

  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}
