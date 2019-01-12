class NoteMap {
  constructor() {
    this.B0 = 31;
    this.C1  = 33;
    this.CS1 = 35;
    this.D1  = 37;
    this.DS1 = 39;
    this.E1  = 41;
    this.F1  = 44;
    this.FS1 = 46;
    this.G1  = 49;
    this.GS1 = 52;
    this.A1  = 55;
    this.AS1 = 58;
    this.B1  = 62;
    this.C2  = 65;
    this.CS2 = 69;
    this.D2  = 73;
    this.DS2 = 78;
    this.E2  = 82;
    this.F2  = 87;
    this.FS2 = 93;
    this.G2  = 98;
    this.GS2 = 104;
    this.A2  = 110;
    this.AS2 = 117;
    this.B2  = 123;
    this.C3  = 131;
    this.CS3 = 139;
    this.D3  = 147;
    this.DS3 = 156;
    this.E3  = 165;
    this.F3  = 175;
    this.FS3 = 185;
    this.G3  = 196;
    this.GS3 = 208;
    this.A3  = 220;
    this.AS3 = 233;
    this.B3  = 247;
    this.C4  = 262;
    this.CS4 = 277;
    this.D4  = 294;
    this.DS4 = 311;
    this.E4  = 330;
    this.F4  = 349;
    this.FS4 = 370;
    this.G4  = 392;
    this.GS4 = 415;
    this.A4  = 440;
    this.AS4 = 466;
    this.B4  = 494;
    this.C5  = 523;
    this.CS5 = 554;
    this.D5  = 587;
    this.DS5 = 622;
    this.E5  = 659;
    this.F5  = 698;
    this.FS5 = 740;
    this.G5  = 784;
    this.GS5 = 831;
    this.A5  = 880;
    this.AS5 = 932;
    this.B5  = 988;
    this.C6  = 1047;
    this.CS6 = 1109;
    this.D6  = 1175;
    this.DS6 = 1245;
    this.E6  = 1319;
    this.F6  = 1397;
    this.FS6 = 1480;
    this.G6  = 1568;
    this.GS6 = 1661;
    this.A6  = 1760;
    this.AS6 = 1865;
    this.B6  = 1976;
    this.C7  = 2093;
    this.CS7 = 2217;
    this.D7  = 2349;
    this.DS7 = 2489;
    this.E7  = 2637;
    this.F7  = 2794;
    this.FS7 = 2960;
    this.G7  = 3136;
    this.GS7 = 3322;
    this.A7  = 3520;
    this.AS7 = 3729;
    this.B7  = 3951;
    this.C8  = 4186;
    this.CS8 = 4435;
    this.D8  = 4699;
    this.DS8 = 4978;

    this.notesMap=[
    this.B0,
    this.C1,
    this.CS1,
    this.D1,
    this.DS1,
    this.E1,
    this.F1,
    this.FS1,
    this.G1,
    this.GS1,
    this.A1,
    this.AS1,
    this.B1,
    this.C2,
    this.CS2,
    this.D2,
    this.DS2,
    this.E2,
    this.F2,
    this.FS2,
    this.G2,
    this.GS2,
    this.A2,
    this.AS2,
    this.B2,
    this.C3,
    this.CS3,
    this.D3,
    this.DS3,
    this.E3,
    this.F3,
    this.FS3,
    this.G3,
    this.GS3,
    this.A3,
    this.AS3,
    this.B3,
    this.C4,
    this.CS4,
    this.D4,
    this.DS4,
    this.E4,
    this.F4,
    this.FS4,
    this.G4,
    this.GS4,
    this.A4,
    this.AS4,
    this.B4,
    this.C5,
    this.CS5,
    this.D5,
    this.DS5,
    this.E5,
    this.F5,
    this.FS5,
    this.G5,
    this.GS5,
    this.A5,
    this.AS5,
    this.B5,
    this.C6,
    this.CS6,
    this.D6,
    this.DS6,
    this.E6,
    this.F6,
    this.FS6,
    this.G6,
    this.GS6,
    this.A6,
    this.AS6,
    this.B6,
    this.C7,
    this.CS7,
    this.D7,
    this.DS7,
    this.E7,
    this.F7,
    this.FS7,
    this.G7,
    this.GS7,
    this.A7,
    this.AS7,
    this.B7,
    this.C8,
    this.CS8,
    this.D8,
    this.DS8
    ];
    this.notesNames=[
    "B0",
    "C1",
    "CS1",
    "D1",
    "DS1",
    "E1",
    "F1",
    "FS1",
    "G1",
    "GS1",
    "A1",
    "AS1",
    "B1",
    "C2",
    "CS2",
    "D2",
    "DS2",
    "E2",
    "F2",
    "FS2",
    "G2",
    "GS2",
    "A2",
    "AS2",
    "B2",
    "C3",
    "CS3",
    "D3",
    "DS3",
    "E3",
    "F3",
    "FS3",
    "G3",
    "GS3",
    "A3",
    "AS3",
    "B3",
    "C4",
    "CS4",
    "D4",
    "DS4",
    "E4",
    "F4",
    "FS4",
    "G4",
    "GS4",
    "A4",
    "AS4",
    "B4",
    "C5",
    "CS5",
    "D5",
    "DS5",
    "E5",
    "F5",
    "FS5",
    "G5",
    "GS5",
    "A5",
    "AS5",
    "B5",
    "C6",
    "CS6",
    "D6",
    "DS6",
    "E6",
    "F6",
    "FS6",
    "G6",
    "GS6",
    "A6",
    "AS6",
    "B6",
    "C7",
    "CS7",
    "D7",
    "DS7",
    "E7",
    "F7",
    "FS7",
    "G7",
    "GS7",
    "A7",
    "AS7",
    "B7",
    "C8",
    "CS8",
    "D8",
    "DS8"
    ];
  }
}
export default new NoteMap()
