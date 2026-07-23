import type { Team } from '../types/game';

export const IPL_TEAMS: Team[] = [
  // 2008 - INAUGURAL ERA
  {
    id: 'rr-2008',
    leagueMode: 'IPL',
    name: 'Rajasthan Royals',
    year: 2008,
    shortCode: 'RR',
    era: 'IPL Inaugural Champions 2008',
    primaryColor: '#ec4899',
    secondaryColor: '#1e3a8a',
    badgeSymbol: '👑',
    overallRating: 84,
    roster: [
      { id: 'rr08_1', name: 'Shane Warne', primaryRole: 'FRONTLINE_SPINNER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 70, bowlingRating: 98, fieldingRating: 84, overallRating: 95, stars: 5, isLegend: true, countryOrFranchise: 'RR 2008' },
      { id: 'rr08_2', name: 'Shane Watson', primaryRole: 'PACE_ALLROUNDER', secondaryRole: 'OPENER', battingRating: 93, bowlingRating: 90, fieldingRating: 88, overallRating: 93, stars: 5, isLegend: true, countryOrFranchise: 'RR 2008' },
      { id: 'rr08_3', name: 'Graeme Smith', primaryRole: 'OPENER', battingRating: 88, bowlingRating: 30, fieldingRating: 82, overallRating: 87, stars: 4, countryOrFranchise: 'RR 2008' },
      { id: 'rr08_4', name: 'Yusuf Pathan', primaryRole: 'SPIN_ALLROUNDER', secondaryRole: 'MIDDLE_ORDER', battingRating: 89, bowlingRating: 82, fieldingRating: 80, overallRating: 87, stars: 4, isLegend: true, countryOrFranchise: 'RR 2008' },
      { id: 'rr08_5', name: 'Sohail Tanvir', primaryRole: 'FAST_BOWLER', battingRating: 45, bowlingRating: 90, fieldingRating: 75, overallRating: 85, stars: 4, countryOrFranchise: 'RR 2008' },
      { id: 'rr08_6', name: 'Swapnil Asnodkar', primaryRole: 'OPENER', battingRating: 76, bowlingRating: 25, fieldingRating: 74, overallRating: 75, stars: 2, countryOrFranchise: 'RR 2008' },
      { id: 'rr08_7', name: 'Naman Ojha', primaryRole: 'WICKETKEEPER', battingRating: 75, bowlingRating: 25, fieldingRating: 80, overallRating: 74, stars: 2, countryOrFranchise: 'RR 2008' },
      { id: 'rr08_8', name: 'Kamran Khan', primaryRole: 'FAST_BOWLER', battingRating: 30, bowlingRating: 75, fieldingRating: 68, overallRating: 71, stars: 2, countryOrFranchise: 'RR 2008' },
    ]
  },
  {
    id: 'csk-2008',
    leagueMode: 'IPL',
    name: 'Chennai Super Kings',
    year: 2008,
    shortCode: 'CSK',
    era: 'IPL Finalists 2008',
    primaryColor: '#eab308',
    secondaryColor: '#1e3a8a',
    badgeSymbol: '🦁',
    overallRating: 86,
    roster: [
      { id: 'csk08_1', name: 'MS Dhoni', primaryRole: 'WICKETKEEPER', secondaryRole: 'MIDDLE_ORDER', battingRating: 94, bowlingRating: 30, fieldingRating: 96, overallRating: 95, stars: 5, isLegend: true, countryOrFranchise: 'CSK 2008' },
      { id: 'csk08_2', name: 'Suresh Raina', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 91, bowlingRating: 70, fieldingRating: 92, overallRating: 90, stars: 4, countryOrFranchise: 'CSK 2008' },
      { id: 'csk08_3', name: 'Matthew Hayden', primaryRole: 'OPENER', battingRating: 90, bowlingRating: 30, fieldingRating: 80, overallRating: 88, stars: 4, isLegend: true, countryOrFranchise: 'CSK 2008' },
      { id: 'csk08_4', name: 'Albie Morkel', primaryRole: 'PACE_ALLROUNDER', battingRating: 80, bowlingRating: 82, fieldingRating: 78, overallRating: 81, stars: 3, countryOrFranchise: 'CSK 2008' },
      { id: 'csk08_5', name: 'Muttiah Muralitharan', primaryRole: 'FRONTLINE_SPINNER', battingRating: 40, bowlingRating: 98, fieldingRating: 75, overallRating: 96, stars: 5, isLegend: true, countryOrFranchise: 'CSK 2008' },
      { id: 'csk08_6', name: 'S Badrinath', primaryRole: 'MIDDLE_ORDER', battingRating: 76, bowlingRating: 30, fieldingRating: 78, overallRating: 75, stars: 2, countryOrFranchise: 'CSK 2008' },
      { id: 'csk08_7', name: 'L Balaji', primaryRole: 'FAST_BOWLER', battingRating: 35, bowlingRating: 79, fieldingRating: 70, overallRating: 74, stars: 2, countryOrFranchise: 'CSK 2008' },
      { id: 'csk08_8', name: 'Manpreet Gony', primaryRole: 'FAST_BOWLER', battingRating: 40, bowlingRating: 76, fieldingRating: 68, overallRating: 72, stars: 2, countryOrFranchise: 'CSK 2008' },
    ]
  },

  // 2009 - DECCAN CHARGERS ERA
  {
    id: 'dc-2009',
    leagueMode: 'IPL',
    name: 'Deccan Chargers',
    year: 2009,
    shortCode: 'DC',
    era: 'IPL Champions 2009',
    primaryColor: '#0284c7',
    secondaryColor: '#f59e0b',
    badgeSymbol: '🐂',
    overallRating: 85,
    roster: [
      { id: 'dc09_1', name: 'Adam Gilchrist', primaryRole: 'WICKETKEEPER', secondaryRole: 'OPENER', battingRating: 94, bowlingRating: 30, fieldingRating: 94, overallRating: 94, stars: 5, isLegend: true, countryOrFranchise: 'Deccan Chargers 2009' },
      { id: 'dc09_2', name: 'Herschelle Gibbs', primaryRole: 'OPENER', battingRating: 88, bowlingRating: 30, fieldingRating: 90, overallRating: 86, stars: 4, countryOrFranchise: 'Deccan Chargers 2009' },
      { id: 'dc09_3', name: 'Rohit Sharma', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 89, bowlingRating: 72, fieldingRating: 86, overallRating: 88, stars: 4, isLegend: true, countryOrFranchise: 'Deccan Chargers 2009' },
      { id: 'dc09_4', name: 'Andrew Symonds', primaryRole: 'PACE_ALLROUNDER', secondaryRole: 'MIDDLE_ORDER', battingRating: 90, bowlingRating: 84, fieldingRating: 92, overallRating: 90, stars: 4, isLegend: true, countryOrFranchise: 'Deccan Chargers 2009' },
      { id: 'dc09_5', name: 'RP Singh', primaryRole: 'FAST_BOWLER', battingRating: 35, bowlingRating: 86, fieldingRating: 74, overallRating: 83, stars: 3, countryOrFranchise: 'Deccan Chargers 2009' },
      { id: 'dc09_6', name: 'Pragyan Ojha', primaryRole: 'FRONTLINE_SPINNER', battingRating: 30, bowlingRating: 82, fieldingRating: 70, overallRating: 78, stars: 3, countryOrFranchise: 'Deccan Chargers 2009' },
      { id: 'dc09_7', name: 'Venugopal Rao', primaryRole: 'MIDDLE_ORDER', battingRating: 74, bowlingRating: 40, fieldingRating: 72, overallRating: 73, stars: 2, countryOrFranchise: 'Deccan Chargers 2009' },
      { id: 'dc09_8', name: 'Harmeet Singh', primaryRole: 'FAST_BOWLER', battingRating: 30, bowlingRating: 74, fieldingRating: 68, overallRating: 71, stars: 2, countryOrFranchise: 'Deccan Chargers 2009' },
    ]
  },

  // 2011 - CSK GOLDEN ERA
  {
    id: 'csk-2011',
    leagueMode: 'IPL',
    name: 'Chennai Super Kings',
    year: 2011,
    shortCode: 'CSK',
    era: 'IPL Back-to-Back Champions 2011',
    primaryColor: '#eab308',
    secondaryColor: '#1e3a8a',
    badgeSymbol: '🦁',
    overallRating: 87,
    roster: [
      { id: 'csk11_1', name: 'MS Dhoni', primaryRole: 'WICKETKEEPER', secondaryRole: 'MIDDLE_ORDER', battingRating: 95, bowlingRating: 30, fieldingRating: 96, overallRating: 96, stars: 5, isLegend: true, countryOrFranchise: 'CSK 2011' },
      { id: 'csk11_2', name: 'Suresh Raina', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 92, bowlingRating: 70, fieldingRating: 94, overallRating: 91, stars: 5, countryOrFranchise: 'CSK 2011' },
      { id: 'csk11_3', name: 'Michael Hussey', primaryRole: 'OPENER', secondaryRole: 'MIDDLE_ORDER', battingRating: 90, bowlingRating: 40, fieldingRating: 84, overallRating: 88, stars: 4, countryOrFranchise: 'CSK 2011' },
      { id: 'csk11_4', name: 'Ravichandran Ashwin', primaryRole: 'FRONTLINE_SPINNER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 68, bowlingRating: 90, fieldingRating: 74, overallRating: 86, stars: 4, countryOrFranchise: 'CSK 2011' },
      { id: 'csk11_5', name: 'Dwayne Bravo', primaryRole: 'PACE_ALLROUNDER', battingRating: 81, bowlingRating: 87, fieldingRating: 88, overallRating: 85, stars: 4, countryOrFranchise: 'CSK 2011' },
      { id: 'csk11_6', name: 'Murali Vijay', primaryRole: 'OPENER', battingRating: 82, bowlingRating: 35, fieldingRating: 76, overallRating: 80, stars: 3, countryOrFranchise: 'CSK 2011' },
      { id: 'csk11_7', name: 'Shadab Jakati', primaryRole: 'FRONTLINE_SPINNER', battingRating: 35, bowlingRating: 77, fieldingRating: 70, overallRating: 74, stars: 2, countryOrFranchise: 'CSK 2011' },
      { id: 'csk11_8', name: 'S Randiv', primaryRole: 'FRONTLINE_SPINNER', battingRating: 30, bowlingRating: 73, fieldingRating: 68, overallRating: 71, stars: 2, countryOrFranchise: 'CSK 2011' },
    ]
  },

  // 2012 - KKR CHAMPIONS
  {
    id: 'kkr-2012',
    leagueMode: 'IPL',
    name: 'Kolkata Knight Riders',
    year: 2012,
    shortCode: 'KKR',
    era: 'IPL Champions 2012',
    primaryColor: '#7e22ce',
    secondaryColor: '#eab308',
    badgeSymbol: '⚔️',
    overallRating: 86,
    roster: [
      { id: 'kkr12_1', name: 'Sunil Narine', primaryRole: 'FRONTLINE_SPINNER', secondaryRole: 'OPENER', battingRating: 75, bowlingRating: 97, fieldingRating: 80, overallRating: 95, stars: 5, isLegend: true, countryOrFranchise: 'KKR 2012' },
      { id: 'kkr12_2', name: 'Gautam Gambhir', primaryRole: 'OPENER', battingRating: 91, bowlingRating: 30, fieldingRating: 82, overallRating: 89, stars: 4, countryOrFranchise: 'KKR 2012' },
      { id: 'kkr12_3', name: 'Jacques Kallis', primaryRole: 'PACE_ALLROUNDER', secondaryRole: 'OPENER', battingRating: 89, bowlingRating: 87, fieldingRating: 86, overallRating: 89, stars: 4, isLegend: true, countryOrFranchise: 'KKR 2012' },
      { id: 'kkr12_4', name: 'Yusuf Pathan', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 84, bowlingRating: 78, fieldingRating: 76, overallRating: 82, stars: 3, countryOrFranchise: 'KKR 2012' },
      { id: 'kkr12_5', name: 'Manvinder Bisla', primaryRole: 'WICKETKEEPER', secondaryRole: 'OPENER', battingRating: 80, bowlingRating: 25, fieldingRating: 80, overallRating: 78, stars: 3, countryOrFranchise: 'KKR 2012' },
      { id: 'kkr12_6', name: 'Rajat Bhatia', primaryRole: 'PACE_ALLROUNDER', battingRating: 73, bowlingRating: 78, fieldingRating: 74, overallRating: 75, stars: 2, countryOrFranchise: 'KKR 2012' },
      { id: 'kkr12_7', name: 'Debabrata Das', primaryRole: 'MIDDLE_ORDER', battingRating: 72, bowlingRating: 25, fieldingRating: 70, overallRating: 71, stars: 2, countryOrFranchise: 'KKR 2012' },
    ]
  },

  // 2013 - MI FIRST TITLE
  {
    id: 'mi-2013',
    leagueMode: 'IPL',
    name: 'Mumbai Indians',
    year: 2013,
    shortCode: 'MI',
    era: 'IPL Maiden Title 2013',
    primaryColor: '#0284c7',
    secondaryColor: '#f97316',
    badgeSymbol: '🌀',
    overallRating: 87,
    roster: [
      { id: 'mi13_1', name: 'Lasith Malinga', primaryRole: 'FAST_BOWLER', battingRating: 40, bowlingRating: 98, fieldingRating: 78, overallRating: 96, stars: 5, isLegend: true, countryOrFranchise: 'MI 2013' },
      { id: 'mi13_2', name: 'Rohit Sharma', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'OPENER', battingRating: 92, bowlingRating: 45, fieldingRating: 86, overallRating: 91, stars: 5, isLegend: true, countryOrFranchise: 'MI 2013' },
      { id: 'mi13_3', name: 'Kieron Pollard', primaryRole: 'PACE_ALLROUNDER', secondaryRole: 'MIDDLE_ORDER', battingRating: 91, bowlingRating: 82, fieldingRating: 92, overallRating: 89, stars: 4, isLegend: true, countryOrFranchise: 'MI 2013' },
      { id: 'mi13_4', name: 'Sachin Tendulkar', primaryRole: 'OPENER', battingRating: 88, bowlingRating: 45, fieldingRating: 80, overallRating: 87, stars: 4, isLegend: true, countryOrFranchise: 'MI 2013' },
      { id: 'mi13_5', name: 'Harbhajan Singh', primaryRole: 'FRONTLINE_SPINNER', battingRating: 62, bowlingRating: 88, fieldingRating: 78, overallRating: 84, stars: 3, countryOrFranchise: 'MI 2013' },
      { id: 'mi13_6', name: 'Dinesh Karthik', primaryRole: 'WICKETKEEPER', secondaryRole: 'MIDDLE_ORDER', battingRating: 84, bowlingRating: 25, fieldingRating: 84, overallRating: 82, stars: 3, countryOrFranchise: 'MI 2013' },
      { id: 'mi13_7', name: 'Rishi Dhawan', primaryRole: 'PACE_ALLROUNDER', battingRating: 72, bowlingRating: 75, fieldingRating: 72, overallRating: 73, stars: 2, countryOrFranchise: 'MI 2013' },
      { id: 'mi13_8', name: 'Aditya Tare', primaryRole: 'WICKETKEEPER', battingRating: 71, bowlingRating: 25, fieldingRating: 78, overallRating: 72, stars: 2, countryOrFranchise: 'MI 2013' },
    ]
  },

  // 2016 - SRH & RCB BLITZKRIEG
  {
    id: 'rcb-2016',
    leagueMode: 'IPL',
    name: 'Royal Challengers Bangalore',
    year: 2016,
    shortCode: 'RCB',
    era: 'IPL Historic Offense 2016',
    primaryColor: '#dc2626',
    secondaryColor: '#000000',
    badgeSymbol: '👑',
    overallRating: 88,
    roster: [
      { id: 'rcb16_1', name: 'Virat Kohli', primaryRole: 'OPENER', secondaryRole: 'MIDDLE_ORDER', battingRating: 99, bowlingRating: 45, fieldingRating: 94, overallRating: 98, stars: 5, isLegend: true, countryOrFranchise: 'RCB 2016' },
      { id: 'rcb16_2', name: 'AB de Villiers', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'WICKETKEEPER', battingRating: 98, bowlingRating: 35, fieldingRating: 96, overallRating: 97, stars: 5, isLegend: true, countryOrFranchise: 'RCB 2016' },
      { id: 'rcb16_3', name: 'Chris Gayle', primaryRole: 'OPENER', battingRating: 93, bowlingRating: 55, fieldingRating: 70, overallRating: 91, stars: 5, isLegend: true, countryOrFranchise: 'RCB 2016' },
      { id: 'rcb16_4', name: 'Yuzvendra Chahal', primaryRole: 'FRONTLINE_SPINNER', battingRating: 30, bowlingRating: 89, fieldingRating: 70, overallRating: 85, stars: 4, countryOrFranchise: 'RCB 2016' },
      { id: 'rcb16_5', name: 'Shane Watson', primaryRole: 'PACE_ALLROUNDER', battingRating: 84, bowlingRating: 84, fieldingRating: 80, overallRating: 84, stars: 3, countryOrFranchise: 'RCB 2016' },
      { id: 'rcb16_6', name: 'KL Rahul', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'WICKETKEEPER', battingRating: 83, bowlingRating: 30, fieldingRating: 82, overallRating: 82, stars: 3, countryOrFranchise: 'RCB 2016' },
      { id: 'rcb16_7', name: 'Sachin Baby', primaryRole: 'MIDDLE_ORDER', battingRating: 73, bowlingRating: 30, fieldingRating: 72, overallRating: 73, stars: 2, countryOrFranchise: 'RCB 2016' },
      { id: 'rcb16_8', name: 'Stuart Binny', primaryRole: 'PACE_ALLROUNDER', battingRating: 71, bowlingRating: 73, fieldingRating: 70, overallRating: 71, stars: 2, countryOrFranchise: 'RCB 2016' },
    ]
  },
  {
    id: 'srh-2016',
    leagueMode: 'IPL',
    name: 'Sunrisers Hyderabad',
    year: 2016,
    shortCode: 'SRH',
    era: 'IPL Champions 2016',
    primaryColor: '#f97316',
    secondaryColor: '#000000',
    badgeSymbol: '🦅',
    overallRating: 86,
    roster: [
      { id: 'srh16_1', name: 'David Warner', primaryRole: 'OPENER', battingRating: 96, bowlingRating: 30, fieldingRating: 90, overallRating: 95, stars: 5, isLegend: true, countryOrFranchise: 'SRH 2016' },
      { id: 'srh16_2', name: 'Bhuvneshwar Kumar', primaryRole: 'FAST_BOWLER', battingRating: 50, bowlingRating: 93, fieldingRating: 80, overallRating: 91, stars: 5, isLegend: true, countryOrFranchise: 'SRH 2016' },
      { id: 'srh16_3', name: 'Mustafizur Rahman', primaryRole: 'FAST_BOWLER', battingRating: 30, bowlingRating: 90, fieldingRating: 75, overallRating: 87, stars: 4, countryOrFranchise: 'SRH 2016' },
      { id: 'srh16_4', name: 'Yuvraj Singh', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 86, bowlingRating: 75, fieldingRating: 84, overallRating: 86, stars: 4, isLegend: true, countryOrFranchise: 'SRH 2016' },
      { id: 'srh16_5', name: 'Shikhar Dhawan', primaryRole: 'OPENER', battingRating: 84, bowlingRating: 30, fieldingRating: 80, overallRating: 83, stars: 3, countryOrFranchise: 'SRH 2016' },
      { id: 'srh16_6', name: 'Moises Henriques', primaryRole: 'PACE_ALLROUNDER', battingRating: 78, bowlingRating: 80, fieldingRating: 80, overallRating: 79, stars: 3, countryOrFranchise: 'SRH 2016' },
      { id: 'srh16_7', name: 'Deepak Hooda', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 74, bowlingRating: 72, fieldingRating: 76, overallRating: 75, stars: 2, countryOrFranchise: 'SRH 2016' },
      { id: 'srh16_8', name: 'Barinder Sran', primaryRole: 'FAST_BOWLER', battingRating: 30, bowlingRating: 75, fieldingRating: 68, overallRating: 72, stars: 2, countryOrFranchise: 'SRH 2016' },
    ]
  },

  // 2018 - CSK COMEBACK
  {
    id: 'csk-2018',
    leagueMode: 'IPL',
    name: 'Chennai Super Kings',
    year: 2018,
    shortCode: 'CSK',
    era: 'IPL Comeback Champions 2018',
    primaryColor: '#eab308',
    secondaryColor: '#1e3a8a',
    badgeSymbol: '🦁',
    overallRating: 86,
    roster: [
      { id: 'csk18_1', name: 'MS Dhoni', primaryRole: 'WICKETKEEPER', secondaryRole: 'MIDDLE_ORDER', battingRating: 95, bowlingRating: 30, fieldingRating: 96, overallRating: 96, stars: 5, isLegend: true, countryOrFranchise: 'CSK 2018' },
      { id: 'csk18_2', name: 'Shane Watson', primaryRole: 'OPENER', secondaryRole: 'PACE_ALLROUNDER', battingRating: 91, bowlingRating: 80, fieldingRating: 78, overallRating: 89, stars: 4, isLegend: true, countryOrFranchise: 'CSK 2018' },
      { id: 'csk18_3', name: 'Ambati Rayudu', primaryRole: 'OPENER', secondaryRole: 'MIDDLE_ORDER', battingRating: 88, bowlingRating: 30, fieldingRating: 80, overallRating: 85, stars: 4, countryOrFranchise: 'CSK 2018' },
      { id: 'csk18_4', name: 'Suresh Raina', primaryRole: 'MIDDLE_ORDER', battingRating: 85, bowlingRating: 60, fieldingRating: 86, overallRating: 84, stars: 3, countryOrFranchise: 'CSK 2018' },
      { id: 'csk18_5', name: 'Dwayne Bravo', primaryRole: 'PACE_ALLROUNDER', battingRating: 80, bowlingRating: 86, fieldingRating: 86, overallRating: 83, stars: 3, countryOrFranchise: 'CSK 2018' },
      { id: 'csk18_6', name: 'Deepak Chahar', primaryRole: 'FAST_BOWLER', battingRating: 45, bowlingRating: 83, fieldingRating: 76, overallRating: 80, stars: 3, countryOrFranchise: 'CSK 2018' },
      { id: 'csk18_7', name: 'Shardul Thakur', primaryRole: 'FAST_BOWLER', battingRating: 50, bowlingRating: 78, fieldingRating: 74, overallRating: 75, stars: 2, countryOrFranchise: 'CSK 2018' },
      { id: 'csk18_8', name: 'Karn Sharma', primaryRole: 'FRONTLINE_SPINNER', battingRating: 45, bowlingRating: 76, fieldingRating: 70, overallRating: 73, stars: 2, countryOrFranchise: 'CSK 2018' },
    ]
  },

  // 2020 - MI DOMINANCE & DC FINALISTS
  {
    id: 'mi-2020',
    leagueMode: 'IPL',
    name: 'Mumbai Indians',
    year: 2020,
    shortCode: 'MI',
    era: 'IPL Peak Juggernaut 2020',
    primaryColor: '#0284c7',
    secondaryColor: '#0369a1',
    badgeSymbol: '🌀',
    overallRating: 89,
    roster: [
      { id: 'mi20_1', name: 'Jasprit Bumrah', primaryRole: 'FAST_BOWLER', battingRating: 40, bowlingRating: 98, fieldingRating: 82, overallRating: 98, stars: 5, isLegend: true, countryOrFranchise: 'MI 2020' },
      { id: 'mi20_2', name: 'Rohit Sharma', primaryRole: 'OPENER', battingRating: 92, bowlingRating: 45, fieldingRating: 84, overallRating: 91, stars: 5, isLegend: true, countryOrFranchise: 'MI 2020' },
      { id: 'mi20_3', name: 'Suryakumar Yadav', primaryRole: 'MIDDLE_ORDER', battingRating: 92, bowlingRating: 35, fieldingRating: 84, overallRating: 90, stars: 4, countryOrFranchise: 'MI 2020' },
      { id: 'mi20_4', name: 'Hardik Pandya', primaryRole: 'PACE_ALLROUNDER', battingRating: 89, bowlingRating: 84, fieldingRating: 88, overallRating: 88, stars: 4, countryOrFranchise: 'MI 2020' },
      { id: 'mi20_5', name: 'Trent Boult', primaryRole: 'FAST_BOWLER', battingRating: 42, bowlingRating: 91, fieldingRating: 82, overallRating: 88, stars: 4, countryOrFranchise: 'MI 2020' },
      { id: 'mi20_6', name: 'Ishan Kishan', primaryRole: 'WICKETKEEPER', secondaryRole: 'OPENER', battingRating: 86, bowlingRating: 25, fieldingRating: 82, overallRating: 84, stars: 3, countryOrFranchise: 'MI 2020' },
      { id: 'mi20_7', name: 'Rahul Chahar', primaryRole: 'FRONTLINE_SPINNER', battingRating: 30, bowlingRating: 81, fieldingRating: 74, overallRating: 77, stars: 2, countryOrFranchise: 'MI 2020' },
      { id: 'mi20_8', name: 'Jayant Yadav', primaryRole: 'SPIN_ALLROUNDER', battingRating: 65, bowlingRating: 75, fieldingRating: 72, overallRating: 72, stars: 2, countryOrFranchise: 'MI 2020' },
    ]
  },
  {
    id: 'dc-2020',
    leagueMode: 'IPL',
    name: 'Delhi Capitals',
    year: 2020,
    shortCode: 'DC',
    era: 'IPL Finalists 2020',
    primaryColor: '#1d4ed8',
    secondaryColor: '#dc2626',
    badgeSymbol: '🐯',
    overallRating: 85,
    roster: [
      { id: 'dc20_1', name: 'Kagiso Rabada', primaryRole: 'FAST_BOWLER', battingRating: 45, bowlingRating: 95, fieldingRating: 82, overallRating: 94, stars: 5, isLegend: true, countryOrFranchise: 'DC 2020' },
      { id: 'dc20_2', name: 'Rishabh Pant', primaryRole: 'WICKETKEEPER', secondaryRole: 'MIDDLE_ORDER', battingRating: 91, bowlingRating: 25, fieldingRating: 86, overallRating: 89, stars: 4, countryOrFranchise: 'DC 2020' },
      { id: 'dc20_3', name: 'Shikhar Dhawan', primaryRole: 'OPENER', battingRating: 89, bowlingRating: 30, fieldingRating: 80, overallRating: 87, stars: 4, countryOrFranchise: 'DC 2020' },
      { id: 'dc20_4', name: 'Anrich Nortje', primaryRole: 'FAST_BOWLER', battingRating: 35, bowlingRating: 89, fieldingRating: 76, overallRating: 86, stars: 4, countryOrFranchise: 'DC 2020' },
      { id: 'dc20_5', name: 'Shreyas Iyer', primaryRole: 'MIDDLE_ORDER', battingRating: 86, bowlingRating: 35, fieldingRating: 82, overallRating: 84, stars: 3, countryOrFranchise: 'DC 2020' },
      { id: 'dc20_6', name: 'Marcus Stoinis', primaryRole: 'PACE_ALLROUNDER', secondaryRole: 'OPENER', battingRating: 83, bowlingRating: 80, fieldingRating: 84, overallRating: 82, stars: 3, countryOrFranchise: 'DC 2020' },
      { id: 'dc20_7', name: 'Axar Patel', primaryRole: 'SPIN_ALLROUNDER', secondaryRole: 'FRONTLINE_SPINNER', battingRating: 72, bowlingRating: 84, fieldingRating: 82, overallRating: 80, stars: 3, countryOrFranchise: 'DC 2020' },
      { id: 'dc20_8', name: 'Tushar Deshpande', primaryRole: 'FAST_BOWLER', battingRating: 30, bowlingRating: 75, fieldingRating: 68, overallRating: 72, stars: 2, countryOrFranchise: 'DC 2020' },
    ]
  },

  // 2022 - GT DEBUT TITLE & RR FINALISTS
  {
    id: 'gt-2022',
    leagueMode: 'IPL',
    name: 'Gujarat Titans',
    year: 2022,
    shortCode: 'GT',
    era: 'IPL Debut Champions 2022',
    primaryColor: '#0f172a',
    secondaryColor: '#eab308',
    badgeSymbol: '⚡',
    overallRating: 86,
    roster: [
      { id: 'gt22_1', name: 'Rashid Khan', primaryRole: 'FRONTLINE_SPINNER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 76, bowlingRating: 97, fieldingRating: 88, overallRating: 96, stars: 5, isLegend: true, countryOrFranchise: 'GT 2022' },
      { id: 'gt22_2', name: 'Hardik Pandya', primaryRole: 'PACE_ALLROUNDER', secondaryRole: 'MIDDLE_ORDER', battingRating: 89, bowlingRating: 85, fieldingRating: 90, overallRating: 90, stars: 4, isLegend: true, countryOrFranchise: 'GT 2022' },
      { id: 'gt22_3', name: 'Shubman Gill', primaryRole: 'OPENER', battingRating: 90, bowlingRating: 30, fieldingRating: 84, overallRating: 88, stars: 4, countryOrFranchise: 'GT 2022' },
      { id: 'gt22_4', name: 'Mohammed Shami', primaryRole: 'FAST_BOWLER', battingRating: 40, bowlingRating: 91, fieldingRating: 76, overallRating: 87, stars: 4, countryOrFranchise: 'GT 2022' },
      { id: 'gt22_5', name: 'David Miller', primaryRole: 'MIDDLE_ORDER', battingRating: 88, bowlingRating: 30, fieldingRating: 82, overallRating: 85, stars: 3, countryOrFranchise: 'GT 2022' },
      { id: 'gt22_6', name: 'Rahul Tewatia', primaryRole: 'SPIN_ALLROUNDER', battingRating: 80, bowlingRating: 76, fieldingRating: 78, overallRating: 78, stars: 2, countryOrFranchise: 'GT 2022' },
      { id: 'gt22_7', name: 'Sai Sudharsan', primaryRole: 'MIDDLE_ORDER', battingRating: 78, bowlingRating: 25, fieldingRating: 76, overallRating: 75, stars: 2, countryOrFranchise: 'GT 2022' },
      { id: 'gt22_8', name: 'Yash Dayal', primaryRole: 'FAST_BOWLER', battingRating: 30, bowlingRating: 76, fieldingRating: 68, overallRating: 72, stars: 2, countryOrFranchise: 'GT 2022' },
    ]
  },
  {
    id: 'rr-2022',
    leagueMode: 'IPL',
    name: 'Rajasthan Royals',
    year: 2022,
    shortCode: 'RR',
    era: 'IPL Finalists 2022',
    primaryColor: '#ec4899',
    secondaryColor: '#1d4ed8',
    badgeSymbol: '💖',
    overallRating: 85,
    roster: [
      { id: 'rr22_1', name: 'Jos Buttler', primaryRole: 'OPENER', secondaryRole: 'WICKETKEEPER', battingRating: 96, bowlingRating: 25, fieldingRating: 88, overallRating: 95, stars: 5, isLegend: true, countryOrFranchise: 'RR 2022' },
      { id: 'rr22_2', name: 'Yuzvendra Chahal', primaryRole: 'FRONTLINE_SPINNER', battingRating: 30, bowlingRating: 93, fieldingRating: 70, overallRating: 89, stars: 4, countryOrFranchise: 'RR 2022' },
      { id: 'rr22_3', name: 'Sanju Samson', primaryRole: 'WICKETKEEPER', secondaryRole: 'MIDDLE_ORDER', battingRating: 88, bowlingRating: 25, fieldingRating: 86, overallRating: 86, stars: 4, countryOrFranchise: 'RR 2022' },
      { id: 'rr22_4', name: 'Yashasvi Jaiswal', primaryRole: 'OPENER', battingRating: 86, bowlingRating: 30, fieldingRating: 80, overallRating: 83, stars: 3, countryOrFranchise: 'RR 2022' },
      { id: 'rr22_5', name: 'Trent Boult', primaryRole: 'FAST_BOWLER', battingRating: 42, bowlingRating: 89, fieldingRating: 82, overallRating: 86, stars: 4, countryOrFranchise: 'RR 2022' },
      { id: 'rr22_6', name: 'Prasidh Krishna', primaryRole: 'FAST_BOWLER', battingRating: 30, bowlingRating: 82, fieldingRating: 72, overallRating: 77, stars: 2, countryOrFranchise: 'RR 2022' },
      { id: 'rr22_7', name: 'Riyan Parag', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 74, bowlingRating: 70, fieldingRating: 78, overallRating: 73, stars: 2, countryOrFranchise: 'RR 2022' },
      { id: 'rr22_8', name: 'Kuldeep Sen', primaryRole: 'FAST_BOWLER', battingRating: 30, bowlingRating: 76, fieldingRating: 68, overallRating: 72, stars: 2, countryOrFranchise: 'RR 2022' },
    ]
  },

  // 2024 - RECENT KKR & SRH RUNNERS
  {
    id: 'kkr-2024',
    leagueMode: 'IPL',
    name: 'Kolkata Knight Riders',
    year: 2024,
    shortCode: 'KKR',
    era: 'IPL Champions 2024',
    primaryColor: '#7e22ce',
    secondaryColor: '#eab308',
    badgeSymbol: '⚔️',
    overallRating: 87,
    roster: [
      { id: 'kkr24_1', name: 'Sunil Narine', primaryRole: 'OPENER', secondaryRole: 'FRONTLINE_SPINNER', battingRating: 92, bowlingRating: 94, fieldingRating: 80, overallRating: 94, stars: 5, isLegend: true, countryOrFranchise: 'KKR 2024' },
      { id: 'kkr24_2', name: 'Andre Russell', primaryRole: 'PACE_ALLROUNDER', battingRating: 91, bowlingRating: 86, fieldingRating: 86, overallRating: 91, stars: 5, isLegend: true, countryOrFranchise: 'KKR 2024' },
      { id: 'kkr24_3', name: 'Mitchell Starc', primaryRole: 'FAST_BOWLER', battingRating: 55, bowlingRating: 93, fieldingRating: 80, overallRating: 90, stars: 4, isLegend: true, countryOrFranchise: 'KKR 2024' },
      { id: 'kkr24_4', name: 'Rinku Singh', primaryRole: 'MIDDLE_ORDER', battingRating: 88, bowlingRating: 35, fieldingRating: 88, overallRating: 86, stars: 4, countryOrFranchise: 'KKR 2024' },
      { id: 'kkr24_5', name: 'Phil Salt', primaryRole: 'OPENER', secondaryRole: 'WICKETKEEPER', battingRating: 87, bowlingRating: 25, fieldingRating: 82, overallRating: 85, stars: 3, countryOrFranchise: 'KKR 2024' },
      { id: 'kkr24_6', name: 'Harshit Rana', primaryRole: 'FAST_BOWLER', battingRating: 40, bowlingRating: 83, fieldingRating: 74, overallRating: 78, stars: 2, countryOrFranchise: 'KKR 2024' },
      { id: 'kkr24_7', name: 'Vaibhav Arora', primaryRole: 'FAST_BOWLER', battingRating: 30, bowlingRating: 78, fieldingRating: 68, overallRating: 73, stars: 2, countryOrFranchise: 'KKR 2024' },
    ]
  },
  {
    id: 'srh-2024',
    leagueMode: 'IPL',
    name: 'Sunrisers Hyderabad',
    year: 2024,
    shortCode: 'SRH',
    era: 'IPL Finalists 2024',
    primaryColor: '#f97316',
    secondaryColor: '#000000',
    badgeSymbol: '💥',
    overallRating: 87,
    roster: [
      { id: 'srh24_1', name: 'Travis Head', primaryRole: 'OPENER', secondaryRole: 'MIDDLE_ORDER', battingRating: 95, bowlingRating: 60, fieldingRating: 86, overallRating: 94, stars: 5, isLegend: true, countryOrFranchise: 'SRH 2024' },
      { id: 'srh24_2', name: 'Heinrich Klaasen', primaryRole: 'WICKETKEEPER', secondaryRole: 'MIDDLE_ORDER', battingRating: 94, bowlingRating: 25, fieldingRating: 88, overallRating: 93, stars: 5, isLegend: true, countryOrFranchise: 'SRH 2024' },
      { id: 'srh24_3', name: 'Pat Cummins', primaryRole: 'FAST_BOWLER', secondaryRole: 'PACE_ALLROUNDER', battingRating: 72, bowlingRating: 93, fieldingRating: 86, overallRating: 90, stars: 4, isLegend: true, countryOrFranchise: 'SRH 2024' },
      { id: 'srh24_4', name: 'Abhishek Sharma', primaryRole: 'OPENER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 88, bowlingRating: 68, fieldingRating: 82, overallRating: 86, stars: 4, countryOrFranchise: 'SRH 2024' },
      { id: 'srh24_5', name: 'Nitish Kumar Reddy', primaryRole: 'PACE_ALLROUNDER', battingRating: 80, bowlingRating: 78, fieldingRating: 80, overallRating: 79, stars: 3, countryOrFranchise: 'SRH 2024' },
      { id: 'srh24_6', name: 'T Natarajan', primaryRole: 'FAST_BOWLER', battingRating: 30, bowlingRating: 87, fieldingRating: 72, overallRating: 83, stars: 3, countryOrFranchise: 'SRH 2024' },
      { id: 'srh24_7', name: 'Shahbaz Ahmed', primaryRole: 'SPIN_ALLROUNDER', battingRating: 72, bowlingRating: 76, fieldingRating: 74, overallRating: 74, stars: 2, countryOrFranchise: 'SRH 2024' },
    ]
  }
];

export const BBL_TEAMS: Team[] = [
  // 2012 - INAUGURAL BBL ERA
  {
    id: 'sixers-2012',
    leagueMode: 'BBL',
    name: 'Sydney Sixers',
    year: 2012,
    shortCode: 'SYS',
    era: 'BBL Champions BBL|01',
    primaryColor: '#ec4899',
    secondaryColor: '#1e293b',
    badgeSymbol: '💖',
    overallRating: 85,
    roster: [
      { id: 'sys12_1', name: 'Mitchell Starc', primaryRole: 'FAST_BOWLER', battingRating: 55, bowlingRating: 94, fieldingRating: 84, overallRating: 92, stars: 5, isLegend: true, countryOrFranchise: 'SYS 2012' },
      { id: 'sys12_2', name: 'Steve Smith', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'OPENER', battingRating: 89, bowlingRating: 68, fieldingRating: 88, overallRating: 88, stars: 4, isLegend: true, countryOrFranchise: 'SYS 2012' },
      { id: 'sys12_3', name: 'Brett Lee', primaryRole: 'FAST_BOWLER', battingRating: 50, bowlingRating: 90, fieldingRating: 78, overallRating: 88, stars: 4, isLegend: true, countryOrFranchise: 'SYS 2012' },
      { id: 'sys12_4', name: 'Brad Haddin', primaryRole: 'WICKETKEEPER', secondaryRole: 'OPENER', battingRating: 84, bowlingRating: 25, fieldingRating: 88, overallRating: 84, stars: 3, countryOrFranchise: 'SYS 2012' },
      { id: 'sys12_5', name: 'Moises Henriques', primaryRole: 'PACE_ALLROUNDER', battingRating: 78, bowlingRating: 78, fieldingRating: 82, overallRating: 79, stars: 3, countryOrFranchise: 'SYS 2012' },
      { id: 'sys12_6', name: 'Nic Maddinson', primaryRole: 'OPENER', battingRating: 75, bowlingRating: 30, fieldingRating: 75, overallRating: 74, stars: 2, countryOrFranchise: 'SYS 2012' },
      { id: 'sys12_7', name: 'Ben Rohrer', primaryRole: 'MIDDLE_ORDER', battingRating: 72, bowlingRating: 25, fieldingRating: 72, overallRating: 71, stars: 2, countryOrFranchise: 'SYS 2012' },
    ]
  },

  // 2014 - PERTH SCORCHERS
  {
    id: 'perth-2014',
    leagueMode: 'BBL',
    name: 'Perth Scorchers',
    year: 2014,
    shortCode: 'PER',
    era: 'BBL Champions BBL|03',
    primaryColor: '#f97316',
    secondaryColor: '#1e293b',
    badgeSymbol: '🔥',
    overallRating: 85,
    roster: [
      { id: 'per14_1', name: 'Mitchell Johnson', primaryRole: 'FAST_BOWLER', battingRating: 60, bowlingRating: 95, fieldingRating: 80, overallRating: 93, stars: 5, isLegend: true, countryOrFranchise: 'PER 2014' },
      { id: 'per14_2', name: 'Brad Hogg', primaryRole: 'FRONTLINE_SPINNER', battingRating: 55, bowlingRating: 90, fieldingRating: 80, overallRating: 87, stars: 4, isLegend: true, countryOrFranchise: 'PER 2014' },
      { id: 'per14_3', name: 'Shaun Marsh', primaryRole: 'OPENER', battingRating: 86, bowlingRating: 30, fieldingRating: 80, overallRating: 84, stars: 3, countryOrFranchise: 'PER 2014' },
      { id: 'per14_4', name: 'Michael Klinger', primaryRole: 'OPENER', battingRating: 84, bowlingRating: 30, fieldingRating: 78, overallRating: 82, stars: 3, countryOrFranchise: 'PER 2014' },
      { id: 'per14_5', name: 'Nathan Coulter-Nile', primaryRole: 'FAST_BOWLER', secondaryRole: 'PACE_ALLROUNDER', battingRating: 68, bowlingRating: 84, fieldingRating: 80, overallRating: 81, stars: 3, countryOrFranchise: 'PER 2014' },
      { id: 'per14_6', name: 'Sam Whiteman', primaryRole: 'WICKETKEEPER', battingRating: 74, bowlingRating: 25, fieldingRating: 82, overallRating: 74, stars: 2, countryOrFranchise: 'PER 2014' },
      { id: 'per14_7', name: 'Ashton Turner', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 72, bowlingRating: 70, fieldingRating: 76, overallRating: 72, stars: 2, countryOrFranchise: 'PER 2014' },
    ]
  },

  // 2018 - ADELAIDE STRIKERS
  {
    id: 'strikers-2018',
    leagueMode: 'BBL',
    name: 'Adelaide Strikers',
    year: 2018,
    shortCode: 'STR',
    era: 'BBL Champions BBL|07',
    primaryColor: '#2563eb',
    secondaryColor: '#000000',
    badgeSymbol: '⚡',
    overallRating: 86,
    roster: [
      { id: 'str18_1', name: 'Rashid Khan', primaryRole: 'FRONTLINE_SPINNER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 76, bowlingRating: 98, fieldingRating: 88, overallRating: 96, stars: 5, isLegend: true, countryOrFranchise: 'STR 2018' },
      { id: 'str18_2', name: 'Travis Head', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'OPENER', battingRating: 90, bowlingRating: 65, fieldingRating: 86, overallRating: 89, stars: 4, isLegend: true, countryOrFranchise: 'STR 2018' },
      { id: 'str18_3', name: 'Alex Carey', primaryRole: 'OPENER', secondaryRole: 'WICKETKEEPER', battingRating: 86, bowlingRating: 25, fieldingRating: 88, overallRating: 86, stars: 4, countryOrFranchise: 'STR 2018' },
      { id: 'str18_4', name: 'Michael Neser', primaryRole: 'PACE_ALLROUNDER', secondaryRole: 'FAST_BOWLER', battingRating: 74, bowlingRating: 84, fieldingRating: 82, overallRating: 81, stars: 3, countryOrFranchise: 'STR 2018' },
      { id: 'str18_5', name: 'Colin Ingram', primaryRole: 'MIDDLE_ORDER', battingRating: 82, bowlingRating: 45, fieldingRating: 78, overallRating: 80, stars: 3, countryOrFranchise: 'STR 2018' },
      { id: 'str18_6', name: 'Billy Stanlake', primaryRole: 'FAST_BOWLER', battingRating: 30, bowlingRating: 82, fieldingRating: 68, overallRating: 76, stars: 2, countryOrFranchise: 'STR 2018' },
      { id: 'str18_7', name: 'Jake Weatherald', primaryRole: 'OPENER', battingRating: 75, bowlingRating: 25, fieldingRating: 72, overallRating: 73, stars: 2, countryOrFranchise: 'STR 2018' },
    ]
  },

  // 2020 - STARS & SIXERS
  {
    id: 'stars-2020',
    leagueMode: 'BBL',
    name: 'Melbourne Stars',
    year: 2020,
    shortCode: 'STA',
    era: 'BBL Finalists BBL|09',
    primaryColor: '#166534',
    secondaryColor: '#facc15',
    badgeSymbol: '⭐',
    overallRating: 87,
    roster: [
      { id: 'sta20_1', name: 'Glenn Maxwell', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 94, bowlingRating: 82, fieldingRating: 95, overallRating: 93, stars: 5, isLegend: true, countryOrFranchise: 'STA 2020' },
      { id: 'sta20_2', name: 'Marcus Stoinis', primaryRole: 'OPENER', secondaryRole: 'PACE_ALLROUNDER', battingRating: 92, bowlingRating: 78, fieldingRating: 86, overallRating: 89, stars: 4, countryOrFranchise: 'STA 2020' },
      { id: 'sta20_3', name: 'Adam Zampa', primaryRole: 'FRONTLINE_SPINNER', battingRating: 40, bowlingRating: 91, fieldingRating: 78, overallRating: 88, stars: 4, countryOrFranchise: 'STA 2020' },
      { id: 'sta20_4', name: 'Dale Steyn', primaryRole: 'FAST_BOWLER', battingRating: 35, bowlingRating: 90, fieldingRating: 80, overallRating: 88, stars: 4, isLegend: true, countryOrFranchise: 'STA 2020' },
      { id: 'sta20_5', name: 'Haris Rauf', primaryRole: 'FAST_BOWLER', battingRating: 30, bowlingRating: 88, fieldingRating: 76, overallRating: 85, stars: 3, countryOrFranchise: 'STA 2020' },
      { id: 'sta20_6', name: 'Peter Handscomb', primaryRole: 'WICKETKEEPER', battingRating: 78, bowlingRating: 25, fieldingRating: 82, overallRating: 77, stars: 2, countryOrFranchise: 'STA 2020' },
      { id: 'sta20_7', name: 'Clint Hinchliffe', primaryRole: 'SPIN_ALLROUNDER', battingRating: 70, bowlingRating: 72, fieldingRating: 72, overallRating: 71, stars: 2, countryOrFranchise: 'STA 2020' },
    ]
  },
  {
    id: 'sixers-2020',
    leagueMode: 'BBL',
    name: 'Sydney Sixers',
    year: 2020,
    shortCode: 'SYS',
    era: 'BBL Champions BBL|09',
    primaryColor: '#ec4899',
    secondaryColor: '#1e293b',
    badgeSymbol: '💖',
    overallRating: 86,
    roster: [
      { id: 'sys20_1', name: 'Sean Abbott', primaryRole: 'FAST_BOWLER', secondaryRole: 'PACE_ALLROUNDER', battingRating: 74, bowlingRating: 89, fieldingRating: 84, overallRating: 86, stars: 4, countryOrFranchise: 'SYS 2020' },
      { id: 'sys20_2', name: 'Josh Philippe', primaryRole: 'OPENER', secondaryRole: 'WICKETKEEPER', battingRating: 87, bowlingRating: 25, fieldingRating: 84, overallRating: 85, stars: 3, countryOrFranchise: 'SYS 2020' },
      { id: 'sys20_3', name: 'James Vince', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'OPENER', battingRating: 86, bowlingRating: 30, fieldingRating: 82, overallRating: 84, stars: 3, countryOrFranchise: 'SYS 2020' },
      { id: 'sys20_4', name: 'Dan Christian', primaryRole: 'PACE_ALLROUNDER', battingRating: 82, bowlingRating: 82, fieldingRating: 85, overallRating: 83, stars: 3, countryOrFranchise: 'SYS 2020' },
      { id: 'sys20_5', name: 'Tom Curran', primaryRole: 'PACE_ALLROUNDER', battingRating: 78, bowlingRating: 84, fieldingRating: 82, overallRating: 82, stars: 3, countryOrFranchise: 'SYS 2020' },
      { id: 'sys20_6', name: 'Steve O\'Keefe', primaryRole: 'FRONTLINE_SPINNER', battingRating: 48, bowlingRating: 84, fieldingRating: 76, overallRating: 80, stars: 3, countryOrFranchise: 'SYS 2020' },
      { id: 'sys20_7', name: 'Jordan Silk', primaryRole: 'MIDDLE_ORDER', battingRating: 76, bowlingRating: 25, fieldingRating: 92, overallRating: 76, stars: 2, countryOrFranchise: 'SYS 2020' },
      { id: 'sys20_8', name: 'Ben Dwarshuis', primaryRole: 'FAST_BOWLER', battingRating: 50, bowlingRating: 78, fieldingRating: 70, overallRating: 74, stars: 2, countryOrFranchise: 'SYS 2020' },
    ]
  },

  // 2024 - BRISBANE HEAT CHAMPIONS
  {
    id: 'heat-2024',
    leagueMode: 'BBL',
    name: 'Brisbane Heat',
    year: 2024,
    shortCode: 'HEA',
    era: 'BBL Champions BBL|13',
    primaryColor: '#0d9488',
    secondaryColor: '#0f172a',
    badgeSymbol: '🔥',
    overallRating: 86,
    roster: [
      { id: 'hea24_1', name: 'Spencer Johnson', primaryRole: 'FAST_BOWLER', battingRating: 35, bowlingRating: 92, fieldingRating: 80, overallRating: 89, stars: 4, countryOrFranchise: 'HEA 2024' },
      { id: 'hea24_2', name: 'Xavier Bartlett', primaryRole: 'FAST_BOWLER', battingRating: 58, bowlingRating: 89, fieldingRating: 80, overallRating: 86, stars: 4, countryOrFranchise: 'HEA 2024' },
      { id: 'hea24_3', name: 'Josh Brown', primaryRole: 'OPENER', battingRating: 87, bowlingRating: 25, fieldingRating: 80, overallRating: 84, stars: 3, countryOrFranchise: 'HEA 2024' },
      { id: 'hea24_4', name: 'Michael Neser', primaryRole: 'PACE_ALLROUNDER', secondaryRole: 'FAST_BOWLER', battingRating: 78, bowlingRating: 86, fieldingRating: 86, overallRating: 84, stars: 3, countryOrFranchise: 'HEA 2024' },
      { id: 'hea24_5', name: 'Nathan McSweeney', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'OPENER', battingRating: 82, bowlingRating: 62, fieldingRating: 82, overallRating: 80, stars: 3, countryOrFranchise: 'HEA 2024' },
      { id: 'hea24_6', name: 'Jimmy Peirson', primaryRole: 'WICKETKEEPER', battingRating: 76, bowlingRating: 25, fieldingRating: 88, overallRating: 77, stars: 2, countryOrFranchise: 'HEA 2024' },
      { id: 'hea24_7', name: 'Paul Walter', primaryRole: 'PACE_ALLROUNDER', battingRating: 75, bowlingRating: 76, fieldingRating: 74, overallRating: 75, stars: 2, countryOrFranchise: 'HEA 2024' },
      { id: 'hea24_8', name: 'Matthew Kuhnemann', primaryRole: 'FRONTLINE_SPINNER', battingRating: 30, bowlingRating: 76, fieldingRating: 70, overallRating: 73, stars: 2, countryOrFranchise: 'HEA 2024' },
    ]
  }
];

export const WORLD_CRICKET_TEAMS: Team[] = [
  // 1979 - WEST INDIES CALYPSO KINGS
  {
    id: 'wi-1979',
    leagueMode: 'WORLD_CRICKET',
    name: 'West Indies',
    year: 1979,
    shortCode: 'WI',
    era: 'World Cup Champions 1979',
    primaryColor: '#881337',
    secondaryColor: '#eab308',
    badgeSymbol: '🌴',
    overallRating: 92,
    roster: [
      { id: 'wc_wi1', name: 'Viv Richards', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 99, bowlingRating: 75, fieldingRating: 94, overallRating: 98, stars: 5, isLegend: true, countryOrFranchise: 'West Indies 1979' },
      { id: 'wc_wi2', name: 'Joel Garner', primaryRole: 'FAST_BOWLER', battingRating: 45, bowlingRating: 98, fieldingRating: 80, overallRating: 96, stars: 5, isLegend: true, countryOrFranchise: 'West Indies 1979' },
      { id: 'wc_wi3', name: 'Michael Holding', primaryRole: 'FAST_BOWLER', battingRating: 40, bowlingRating: 96, fieldingRating: 82, overallRating: 94, stars: 5, isLegend: true, countryOrFranchise: 'West Indies 1979' },
      { id: 'wc_wi4', name: 'Gordon Greenidge', primaryRole: 'OPENER', battingRating: 90, bowlingRating: 30, fieldingRating: 82, overallRating: 88, stars: 4, isLegend: true, countryOrFranchise: 'West Indies 1979' },
      { id: 'wc_wi5', name: 'Clive Lloyd', primaryRole: 'MIDDLE_ORDER', battingRating: 90, bowlingRating: 40, fieldingRating: 86, overallRating: 88, stars: 4, isLegend: true, countryOrFranchise: 'West Indies 1979' },
      { id: 'wc_wi6', name: 'Andy Roberts', primaryRole: 'FAST_BOWLER', battingRating: 40, bowlingRating: 89, fieldingRating: 76, overallRating: 86, stars: 4, isLegend: true, countryOrFranchise: 'West Indies 1979' },
      { id: 'wc_wi7', name: 'Deryck Murray', primaryRole: 'WICKETKEEPER', battingRating: 74, bowlingRating: 25, fieldingRating: 84, overallRating: 75, stars: 2, countryOrFranchise: 'West Indies 1979' },
      { id: 'wc_wi8', name: 'Collis King', primaryRole: 'PACE_ALLROUNDER', battingRating: 78, bowlingRating: 74, fieldingRating: 75, overallRating: 76, stars: 2, countryOrFranchise: 'West Indies 1979' },
    ]
  },

  // 1983 - INDIA UNDERDOG CHAMPIONS
  {
    id: 'ind-1983',
    leagueMode: 'WORLD_CRICKET',
    name: 'India',
    year: 1983,
    shortCode: 'IND',
    era: 'World Cup Champions 1983',
    primaryColor: '#0284c7',
    secondaryColor: '#ffffff',
    badgeSymbol: '🏆',
    overallRating: 88,
    roster: [
      { id: 'wc83_1', name: 'Kapil Dev', primaryRole: 'PACE_ALLROUNDER', secondaryRole: 'MIDDLE_ORDER', battingRating: 94, bowlingRating: 96, fieldingRating: 92, overallRating: 96, stars: 5, isLegend: true, countryOrFranchise: 'India 1983' },
      { id: 'wc83_2', name: 'Sunil Gavaskar', primaryRole: 'OPENER', battingRating: 93, bowlingRating: 30, fieldingRating: 84, overallRating: 91, stars: 5, isLegend: true, countryOrFranchise: 'India 1983' },
      { id: 'wc83_3', name: 'Mohinder Amarnath', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'PACE_ALLROUNDER', battingRating: 88, bowlingRating: 84, fieldingRating: 82, overallRating: 87, stars: 4, isLegend: true, countryOrFranchise: 'India 1983' },
      { id: 'wc83_4', name: 'Roger Binny', primaryRole: 'PACE_ALLROUNDER', secondaryRole: 'FAST_BOWLER', battingRating: 76, bowlingRating: 86, fieldingRating: 80, overallRating: 82, stars: 3, countryOrFranchise: 'India 1983' },
      { id: 'wc83_5', name: 'Kris Srikkanth', primaryRole: 'OPENER', battingRating: 82, bowlingRating: 30, fieldingRating: 78, overallRating: 80, stars: 3, countryOrFranchise: 'India 1983' },
      { id: 'wc83_6', name: 'Syed Kirmani', primaryRole: 'WICKETKEEPER', battingRating: 74, bowlingRating: 25, fieldingRating: 86, overallRating: 77, stars: 2, countryOrFranchise: 'India 1983' },
      { id: 'wc83_7', name: 'Madan Lal', primaryRole: 'PACE_ALLROUNDER', battingRating: 73, bowlingRating: 82, fieldingRating: 76, overallRating: 77, stars: 2, countryOrFranchise: 'India 1983' },
      { id: 'wc83_8', name: 'Kirti Azad', primaryRole: 'SPIN_ALLROUNDER', battingRating: 70, bowlingRating: 72, fieldingRating: 70, overallRating: 71, stars: 2, countryOrFranchise: 'India 1983' },
    ]
  },

  // 1999 - AUSTRALIA 1999
  {
    id: 'aus-1999',
    leagueMode: 'WORLD_CRICKET',
    name: 'Australia',
    year: 1999,
    shortCode: 'AUS',
    era: 'World Cup Champions 1999',
    primaryColor: '#facc15',
    secondaryColor: '#15803d',
    badgeSymbol: '🦘',
    overallRating: 91,
    roster: [
      { id: 'wc_aus1', name: 'Shane Warne', primaryRole: 'FRONTLINE_SPINNER', battingRating: 65, bowlingRating: 98, fieldingRating: 85, overallRating: 97, stars: 5, isLegend: true, countryOrFranchise: 'Australia 1999' },
      { id: 'wc_aus2', name: 'Glenn McGrath', primaryRole: 'FAST_BOWLER', battingRating: 30, bowlingRating: 97, fieldingRating: 78, overallRating: 95, stars: 5, isLegend: true, countryOrFranchise: 'Australia 1999' },
      { id: 'wc_aus3', name: 'Adam Gilchrist', primaryRole: 'WICKETKEEPER', secondaryRole: 'OPENER', battingRating: 93, bowlingRating: 30, fieldingRating: 95, overallRating: 94, stars: 5, isLegend: true, countryOrFranchise: 'Australia 1999' },
      { id: 'wc_aus4', name: 'Ricky Ponting', primaryRole: 'MIDDLE_ORDER', battingRating: 94, bowlingRating: 40, fieldingRating: 94, overallRating: 94, stars: 5, isLegend: true, countryOrFranchise: 'Australia 1999' },
      { id: 'wc_aus5', name: 'Steve Waugh', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'PACE_ALLROUNDER', battingRating: 89, bowlingRating: 72, fieldingRating: 86, overallRating: 88, stars: 4, isLegend: true, countryOrFranchise: 'Australia 1999' },
      { id: 'wc_aus6', name: 'Mark Waugh', primaryRole: 'OPENER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 86, bowlingRating: 70, fieldingRating: 92, overallRating: 86, stars: 4, countryOrFranchise: 'Australia 1999' },
      { id: 'wc_aus7', name: 'Damien Fleming', primaryRole: 'FAST_BOWLER', battingRating: 35, bowlingRating: 82, fieldingRating: 72, overallRating: 78, stars: 2, countryOrFranchise: 'Australia 1999' },
      { id: 'wc_aus8', name: 'Tom Moody', primaryRole: 'PACE_ALLROUNDER', battingRating: 74, bowlingRating: 76, fieldingRating: 74, overallRating: 75, stars: 2, countryOrFranchise: 'Australia 1999' },
    ]
  },

  // 2007 - INDIA T20 WORLD CUP CHAMPIONS
  {
    id: 'ind-2007',
    leagueMode: 'WORLD_CRICKET',
    name: 'India',
    year: 2007,
    shortCode: 'IND',
    era: 'T20 World Champions 2007',
    primaryColor: '#2563eb',
    secondaryColor: '#f97316',
    badgeSymbol: '🇮🇳',
    overallRating: 89,
    roster: [
      { id: 'ind07_1', name: 'Yuvraj Singh', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 97, bowlingRating: 82, fieldingRating: 94, overallRating: 96, stars: 5, isLegend: true, countryOrFranchise: 'India 2007' },
      { id: 'ind07_2', name: 'MS Dhoni', primaryRole: 'WICKETKEEPER', secondaryRole: 'MIDDLE_ORDER', battingRating: 92, bowlingRating: 30, fieldingRating: 94, overallRating: 93, stars: 5, isLegend: true, countryOrFranchise: 'India 2007' },
      { id: 'ind07_3', name: 'Virender Sehwag', primaryRole: 'OPENER', battingRating: 93, bowlingRating: 60, fieldingRating: 78, overallRating: 91, stars: 5, isLegend: true, countryOrFranchise: 'India 2007' },
      { id: 'ind07_4', name: 'Gautam Gambhir', primaryRole: 'OPENER', battingRating: 91, bowlingRating: 30, fieldingRating: 82, overallRating: 89, stars: 4, countryOrFranchise: 'India 2007' },
      { id: 'ind07_5', name: 'Irfan Pathan', primaryRole: 'PACE_ALLROUNDER', battingRating: 80, bowlingRating: 88, fieldingRating: 80, overallRating: 85, stars: 4, countryOrFranchise: 'India 2007' },
      { id: 'ind07_6', name: 'RP Singh', primaryRole: 'FAST_BOWLER', battingRating: 35, bowlingRating: 88, fieldingRating: 74, overallRating: 84, stars: 3, countryOrFranchise: 'India 2007' },
      { id: 'ind07_7', name: 'Joginder Sharma', primaryRole: 'PACE_ALLROUNDER', battingRating: 68, bowlingRating: 76, fieldingRating: 70, overallRating: 72, stars: 2, countryOrFranchise: 'India 2007' },
      { id: 'ind07_8', name: 'Robin Uthappa', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'OPENER', battingRating: 78, bowlingRating: 25, fieldingRating: 76, overallRating: 77, stars: 2, countryOrFranchise: 'India 2007' },
    ]
  },

  // 2011 - INDIA WORLD CUP CHAMPIONS
  {
    id: 'ind-2011',
    leagueMode: 'WORLD_CRICKET',
    name: 'India',
    year: 2011,
    shortCode: 'IND',
    era: 'World Cup Champions 2011',
    primaryColor: '#2563eb',
    secondaryColor: '#f97316',
    badgeSymbol: '🏏',
    overallRating: 92,
    roster: [
      { id: 'wc_ind1', name: 'Sachin Tendulkar', primaryRole: 'OPENER', secondaryRole: 'MIDDLE_ORDER', battingRating: 98, bowlingRating: 68, fieldingRating: 84, overallRating: 97, stars: 5, isLegend: true, countryOrFranchise: 'India 2011' },
      { id: 'wc_ind2', name: 'Yuvraj Singh', primaryRole: 'SPIN_ALLROUNDER', secondaryRole: 'MIDDLE_ORDER', battingRating: 93, bowlingRating: 87, fieldingRating: 92, overallRating: 94, stars: 5, isLegend: true, countryOrFranchise: 'India 2011' },
      { id: 'wc_ind3', name: 'MS Dhoni', primaryRole: 'WICKETKEEPER', secondaryRole: 'MIDDLE_ORDER', battingRating: 93, bowlingRating: 30, fieldingRating: 96, overallRating: 94, stars: 5, isLegend: true, countryOrFranchise: 'India 2011' },
      { id: 'wc_ind4', name: 'Zaheer Khan', primaryRole: 'FAST_BOWLER', battingRating: 35, bowlingRating: 94, fieldingRating: 76, overallRating: 92, stars: 5, isLegend: true, countryOrFranchise: 'India 2011' },
      { id: 'wc_ind5', name: 'Virender Sehwag', primaryRole: 'OPENER', battingRating: 92, bowlingRating: 62, fieldingRating: 78, overallRating: 90, stars: 4, isLegend: true, countryOrFranchise: 'India 2011' },
      { id: 'wc_ind6', name: 'Gautam Gambhir', primaryRole: 'MIDDLE_ORDER', battingRating: 89, bowlingRating: 30, fieldingRating: 82, overallRating: 87, stars: 4, countryOrFranchise: 'India 2011' },
      { id: 'wc_ind7', name: 'Virat Kohli', primaryRole: 'MIDDLE_ORDER', battingRating: 87, bowlingRating: 35, fieldingRating: 88, overallRating: 86, stars: 4, isLegend: true, countryOrFranchise: 'India 2011' },
      { id: 'wc_ind8', name: 'Munaf Patel', primaryRole: 'FAST_BOWLER', battingRating: 30, bowlingRating: 80, fieldingRating: 68, overallRating: 75, stars: 2, countryOrFranchise: 'India 2011' },
    ]
  },

  // 2019 - ENGLAND WORLD CUP CHAMPIONS
  {
    id: 'eng-2019',
    leagueMode: 'WORLD_CRICKET',
    name: 'England',
    year: 2019,
    shortCode: 'ENG',
    era: 'World Cup Champions 2019',
    primaryColor: '#0284c7',
    secondaryColor: '#dc2626',
    badgeSymbol: '🦁',
    overallRating: 90,
    roster: [
      { id: 'wc_eng1', name: 'Ben Stokes', primaryRole: 'PACE_ALLROUNDER', secondaryRole: 'MIDDLE_ORDER', battingRating: 94, bowlingRating: 90, fieldingRating: 94, overallRating: 95, stars: 5, isLegend: true, countryOrFranchise: 'England 2019' },
      { id: 'wc_eng2', name: 'Jos Buttler', primaryRole: 'WICKETKEEPER', secondaryRole: 'MIDDLE_ORDER', battingRating: 94, bowlingRating: 25, fieldingRating: 92, overallRating: 93, stars: 5, isLegend: true, countryOrFranchise: 'England 2019' },
      { id: 'wc_eng3', name: 'Jofra Archer', primaryRole: 'FAST_BOWLER', battingRating: 62, bowlingRating: 94, fieldingRating: 82, overallRating: 92, stars: 5, countryOrFranchise: 'England 2019' },
      { id: 'wc_eng4', name: 'Joe Root', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'SPIN_ALLROUNDER', battingRating: 91, bowlingRating: 68, fieldingRating: 88, overallRating: 89, stars: 4, countryOrFranchise: 'England 2019' },
      { id: 'wc_eng5', name: 'Jonny Bairstow', primaryRole: 'OPENER', secondaryRole: 'WICKETKEEPER', battingRating: 88, bowlingRating: 25, fieldingRating: 84, overallRating: 86, stars: 4, countryOrFranchise: 'England 2019' },
      { id: 'wc_eng6', name: 'Adil Rashid', primaryRole: 'FRONTLINE_SPINNER', battingRating: 58, bowlingRating: 86, fieldingRating: 76, overallRating: 82, stars: 3, countryOrFranchise: 'England 2019' },
      { id: 'wc_eng7', name: 'Liam Plunkett', primaryRole: 'FAST_BOWLER', battingRating: 52, bowlingRating: 82, fieldingRating: 72, overallRating: 77, stars: 2, countryOrFranchise: 'England 2019' },
    ]
  },

  // 2024 - INDIA T20 WORLD CUP CHAMPIONS
  {
    id: 'ind-2024',
    leagueMode: 'WORLD_CRICKET',
    name: 'India',
    year: 2024,
    shortCode: 'IND',
    era: 'T20 World Champions 2024',
    primaryColor: '#2563eb',
    secondaryColor: '#f97316',
    badgeSymbol: '🏆',
    overallRating: 92,
    roster: [
      { id: 'ind24_1', name: 'Jasprit Bumrah', primaryRole: 'FAST_BOWLER', battingRating: 40, bowlingRating: 99, fieldingRating: 82, overallRating: 98, stars: 5, isLegend: true, countryOrFranchise: 'India 2024' },
      { id: 'ind24_2', name: 'Rohit Sharma', primaryRole: 'OPENER', battingRating: 95, bowlingRating: 40, fieldingRating: 84, overallRating: 94, stars: 5, isLegend: true, countryOrFranchise: 'India 2024' },
      { id: 'ind24_3', name: 'Virat Kohli', primaryRole: 'OPENER', secondaryRole: 'MIDDLE_ORDER', battingRating: 95, bowlingRating: 30, fieldingRating: 92, overallRating: 94, stars: 5, isLegend: true, countryOrFranchise: 'India 2024' },
      { id: 'ind24_4', name: 'Suryakumar Yadav', primaryRole: 'MIDDLE_ORDER', battingRating: 94, bowlingRating: 30, fieldingRating: 94, overallRating: 93, stars: 5, isLegend: true, countryOrFranchise: 'India 2024' },
      { id: 'ind24_5', name: 'Hardik Pandya', primaryRole: 'PACE_ALLROUNDER', battingRating: 89, bowlingRating: 89, fieldingRating: 90, overallRating: 91, stars: 5, isLegend: true, countryOrFranchise: 'India 2024' },
      { id: 'ind24_6', name: 'Rishabh Pant', primaryRole: 'WICKETKEEPER', battingRating: 88, bowlingRating: 25, fieldingRating: 88, overallRating: 87, stars: 4, countryOrFranchise: 'India 2024' },
      { id: 'ind24_7', name: 'Axar Patel', primaryRole: 'SPIN_ALLROUNDER', secondaryRole: 'FRONTLINE_SPINNER', battingRating: 82, bowlingRating: 88, fieldingRating: 84, overallRating: 85, stars: 4, countryOrFranchise: 'India 2024' },
      { id: 'ind24_8', name: 'Arshdeep Singh', primaryRole: 'FAST_BOWLER', battingRating: 30, bowlingRating: 87, fieldingRating: 74, overallRating: 81, stars: 3, countryOrFranchise: 'India 2024' },
      { id: 'ind24_9', name: 'Shivam Dube', primaryRole: 'MIDDLE_ORDER', secondaryRole: 'PACE_ALLROUNDER', battingRating: 78, bowlingRating: 72, fieldingRating: 72, overallRating: 76, stars: 2, countryOrFranchise: 'India 2024' },
    ]
  }
];
