import { AxiosResponse } from "axios";
import { InputHTMLAttributes } from "vue";
import api from "../api";

export type ISearhCandidate = {
  name: string;
  code?: number;
  birth?: Date;
  cpf?: string;
  rg?: string;
}

export type IHTMLSearhCandidate = {
  name: InputHTMLAttributes;
  code: InputHTMLAttributes;
  birth: InputHTMLAttributes;
  cpf: InputHTMLAttributes;
  rg: InputHTMLAttributes;
}

export class SearhCandidate{
  async execute({ name, code, birth, cpf, rg }: ISearhCandidate): Promise<AxiosResponse | Error> {
    try {     
      const candidates = await api.get("/CandidateSearch",{
        params: { name, code, birth, cpf, rg },
      })
      return candidates
    } catch (error: any) {
      console.log('candidates', error.message)
      return new Error(error.message);
    }
  }
}