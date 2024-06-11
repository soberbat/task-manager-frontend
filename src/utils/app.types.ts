export enum Tabs {
  HOME,
  TEAM,
  PROJECTS,
}

export interface Employee {
  id: number;
  username: string;
  email: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string | null;
  tasks: Task[];
  teamId: number;
  employeeId?: number | null;
  team: Team;
  employee?: Employee | null;
}

interface EmployeeOnTeams {
  teamId: number;
  employeeId: number;
}

export interface UserReturnType {
  id: number;
  username: string;
  email: string;
  teams: EmployeeOnTeams[];
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  priority: string;
  employee: Employee;
  projectId?: number | null;
  project?: Project | null;
  updatedAt: string;
}

export interface TeamMember {
  teamId: number;
  employeeId: number;
  employee: Employee;
}

interface Team {
  id: number;
  name: string;
  members?: TeamMember[];
}

export interface UserData {
  id: number;
  username: string;
  email: string;
  tasks: any[]; // You can replace 'any' with the actual type for tasks
  projects?: Project[];
  teams?: {
    teamId: number;
    employeeId: number;
    team: Team;
  }[];
}
