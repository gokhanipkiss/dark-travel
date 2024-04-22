import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios, { delayResponse: 0 });


const db = 
{
    users: [
      { 
        id: 1,
        name: "Hakan Atakan",
        age: "23",
        sex: "M",
        email: "h.atakan@gmail.com",
        password: "Abcd.3456",
        location: "İstanbul, Türkiye",
        persona: "myst",
        badges: ["badge2", "badge3"],
        friendCount: 12,
        memories: []
      },
      { 
        id: 5,
        name: "Ahmet Yıldız",
        age: "32",
        sex: "M",
        email: "ahmety@gmail.com",
        password: "5432A.bc",
        location: "Konya, Türkiye",
        persona:"hist",
        badges: ["badge1", "badge2", "badge3"],
        friendCount: 5,
        memories: ["Anı 1", "Anı 2", "Anı 3"]
      },
      {
        id:3,
        name: "Esin Şahin",
        age: "41",
        sex: "F",
        email: "esinsahin83@hotmail.com",
        password: "3344abcd",
        location: "Ankara, Türkiye",
        persona:"adv",
        badges:["badge1"],
        friendCount: 0,
        memories: ["Anı 1"]
      }
    ],
  
    places: [
      {
          id:1,
          name: "Ankapark",
          location: "Ankara, Türkiye",
          categories: ["arch","hist","trend"]
      },
      {
          id:2,
          name: "Yerebatan Sarnıcı",
          location: "İstanbul, Türkiye",
          categories: ["arch","trend"]
      },
      {
          id:3,
          name: "Manyetik Yol",
          location:"Erzurum, Türkiye",
          categories: ["hist","myst"]
      }
    ],
    
    stories: [
        {
          id: 1,
          name: "Gizemli Tarsus Kazısı",
          categories: ["myst"],
          body: "Şaibeli bir kurşunun hedefi olan polis memurunun ölümüyle.."	
        },
        {
          id: 2,
          name: "Takunyalı Tezveren ",
          categories: ["hist"],
          body: "Anlatıya göre Tezveren Baba ayakları olmayan ve bu sebeple ellerine takunya geçirerek..."	
        },
        {
          id: 3,
          name: "Ankara’nın Gizemli Piramitleri",
          categories: ["adv", "mist"],
          body: "Mitolojide dokunduğu her şeyi altına dönüştürdüğüne..."	
        }	  
    ],

    tours: [
      {
        id:1,
        name: "Kahırlar Köyü",
        leader: "Ruhi Akdeniz",
        leaderTitle: "En sevilen lider",
        body: "Mezar soyguncularının başına gelen esrarengiz olayların izini sürüyoruz.",
        categories: ["myst", "adv"],
        location: "Konya, Türkiye"
      },
      {
        id:2,
        name: "Takunyalı Tezveren",
        leader: "Sevda Dernek",
        leaderTitle: "En sevilen lider",
        body: "Tezveren Sultan Anadolu'nun en bilinen kadın evliyalarından biridir.",
        categories: ["myst"],
        location: "Kayseri, Türkiye"
      },
      {	
        id:3,
        name: "Yerebatan Sarnıcı",
        leader: "Emre Aydın",
        leaderTitle: "En sevilen lider",
        body: "İstanbul sokaklarının altında bir Bizans mühendisliği harikası.",
        categories: ["hist", "trend"],
        location: "İstanbul, Türkiye"
      },
      {
        id:4,
        name: "Cebeci Asri Mezarlığı",
        leader: "Emre Aydın",
        leaderTitle: "En sevilen lider",
        body: "1935 yılında Martin Elsaesser tarafından tasarlan mezarlığı geziyoruz.",
        categories: ["hist"],
        location: "Ankara, Türkiye"
        
      }
      
    ]
    
  }

// Mock any GET request to /api/users
// arguments for reply are (status, data, headers)

  mock.onGet('/api/users').reply(200, db.users)

  mock.onGet('/api/places').reply(200, db.places)

  mock.onGet('/api/stories').reply(200, db.stories)

  mock.onGet('/api/tours').reply(200, db.tours)