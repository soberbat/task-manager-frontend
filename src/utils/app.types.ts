export enum Tabs {
  HOME,
  PROJECTS,
  TEAM,
}

export interface Employee {
  id: number;
  username: string;
  email: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  teamId: number;
  employeeId: number;
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
