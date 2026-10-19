declare module "naija-state-local-government" {
  interface NaijaStateDetails { state: string; senatorial_districts: string[]; lgas: string[] }
  const NaijaStates: {
    states(): string[];
    lgas(state: string): NaijaStateDetails;
    senatorial_districts(state: string): { state: string; senatorial_districts: string[] };
    all(): NaijaStateDetails[];
  };
  export default NaijaStates;
}
