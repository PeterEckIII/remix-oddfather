// this is an index signature
interface TeamArray {
  [index: string]: string;
}

let teamObj: TeamArray = {
  STL: "6388cce2-810f-4c95-aa9e-8bc34d97548d",
  SFG: "f96dc8d8-650b-4a47-8b67-ab56fbc2f774",
  SDP: "2225fe41-e42c-444e-9ea2-90111843d7b8",
  PIT: "c202bc06-234e-4759-9b8b-62cb7675d2f7",
  NYY: "ac66a05a-86d1-4312-8a48-4895887f3844",
  MIL: "e492aedb-8c2f-40b8-b8de-2b474c095ca1",
  KCR: "41ac31eb-3eea-4886-8737-0600f9e2d07e",
  HOU: "e93fe422-99ed-4f6e-8b7a-ef3d83288eea",
  COL: "8da3160d-d3c8-4966-afc3-eebd15c84a84",
  CHW: "224b84f4-02bb-4a08-86fd-73b7f631d10f",
  ATL: "edf6a3e0-f5b8-454c-a31c-b44ffaa1bd38",
  LAA: "f38e3f4f-a358-49e0-9dee-ccef031ee23f",
  CIN: "9d8cbc70-0756-440e-a3f7-a44abf32e0b4",
  CHC: "0ed49f86-ccad-4b73-964f-426ebd8bc87e",
  NYM: "76a52300-2a3d-4b81-8660-4bc68fc846ba",
  BAL: "91bbd7b6-8990-4b6d-a4af-4f9acda80232",
  PHI: "7b2268cb-b50c-4325-aa3d-df062b502ce5",
  MIA: "56ea2215-5e99-408d-8957-1844797a95fc",
  TBR: "7c69a9ea-8688-4c5a-8657-096066b939c8",
  ARI: "85126a22-279e-43cb-a46f-3e7f3a576f5e",
  MIN: "13ca75db-0c32-4803-857a-77102b23edd8",
  BOS: "3568a117-4a3d-47a8-9198-0e89f2107fe9",
  OAK: "1d035af6-c490-4edf-95a2-923784e76391",
  TEX: "a2918c70-d819-4f47-a364-ef04335d0da5",
  DET: "efa03ac4-c45a-4465-9ec6-5edb8b1f01a0",
  CLE: "dbbc9edb-9a92-44a3-9518-439ecedb28f4",
  LAD: "30f15f32-0dcb-48ef-9b7b-136fc47e3664",
  WSN: "b4bbe40b-9863-4585-9c9f-fede7516d1fe",
  TOR: "57566226-288b-4c19-80d7-906e924082e8",
  SEA: "2b252f74-bc72-4d1b-b5e1-1b9c5e13da37",
};

function getTeamId(teamCode: string): string {
  return teamObj[teamCode];
}

const formatBoxscoreIndex = (boxscoreIndex: string) => {
  let newBoxscoreIndex;
  if (boxscoreIndex.endsWith(".shtml")) {
    const slicedIndex = boxscoreIndex.slice(0, -6).slice(1);
    newBoxscoreIndex = slicedIndex.replace(/\//gi, "-");
  } else {
    newBoxscoreIndex = boxscoreIndex.replace(/\//gi, "-");
  }
  return newBoxscoreIndex;
};

const transformDate = (timestamp: string): string => {
  return "hello";
};
const formatTimeWithSuffix = (timestamp: string): string => {
  return "hello ";
};

const truncateTime = (timestamp: string) => {
  const readableDate: string = transformDate(timestamp);
  const time = formatTimeWithSuffix(readableDate);
  const snippedTime = time
    .replace(/:00/i, "")
    .replace(/:/i, "")
    .replace(/:\d\d/i, "");
  if (snippedTime[0] === "0") {
    return snippedTime.slice(1);
  } else {
    return snippedTime;
  }
};

const createId = (timestamp: string, boxscoreIndex: string) => {
  return `${formatBoxscoreIndex(boxscoreIndex)}-${truncateTime(timestamp)}`;
};

export default {};
