export interface Fighter {
  idPlayer: string;
  strPlayer: string;
  strPlayerAlternate: string | null;
  strTeam: string;
  strSport: string;
  strNationality: string | null;
  strBirthLocation: string | null;
  dateBorn: string | null;
  strHeight: string | null;
  strWeight: string | null;
  strStatus: string | null;
  strGender: string | null;
  strPosition: string | null;
  strDescriptionEN: string | null;
  strThumb: string | null;
  strCutout: string | null;
  strRender: string | null;
  strBanner: string | null;
  strFanart1: string | null;
  strFanart2: string | null;
  strFanart3: string | null;
  strFanart4: string | null;
  strFacebook: string | null;
  strTwitter: string | null;
  strInstagram: string | null;
  strYoutube: string | null;
}

export interface FightersListResponse {
  player: Fighter[] | null;
}

export interface FighterDetailResponse {
  players: Fighter[] | null;
}
