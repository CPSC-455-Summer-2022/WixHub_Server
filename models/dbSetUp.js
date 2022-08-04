const mongoose = require("mongoose");
const User = require("./users");
const Destination = require("./destinations");
const Question = require("./questions");
const { v4: uuid } = require("uuid");
const router = require("../routes");

const dburl = "mongodb+srv://m001-student:m001-mongodb-basics@cluster0.grgqp0e.mongodb.net/?retryWrites=true&w=majority";

const connectDb = async function () {
    await mongoose.connect(dburl);
    console.log("connected to Mongo db");
};

const dbSetUp = async function () {
    await connectDb();
    await initializeDb();
};

const initializeDb = async function () {
    if (await User.find().limit(1).count(true) > 0) {
        console.log("Users initialized")
    } else {
        console.log("Initializing users...")
        await initializeUsers();
    }

    if (await Destination.find().limit(1).count(true) > 0) {
        console.log("Destination initialized")
    } else {
        console.log("Initializing destination...")
        await initializeDestinations();
    }

    if (await Question.find().limit(1).count(true) > 0) {
        console.log("Question initialized")
    } else {
        console.log("Initializing question...")
        await initializeQuestions();
    }
    console.log("db is initialized");
};

const initializeQuestions = async function () {
    await Question.collection.drop().catch((err) => { });
    await Question.insertMany(
        [
            {
                "question": "What type of traveller are you?",
                "questionImage": "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=564&q=80",
                "destinationMapping": [
                    { "response": "I like to go with the flow", "responseNumber": 1, "destination": 12, "weighting": 4 },
                    { "response": "I plan everything", "responseNumber": 2, "destination": 9, "weighting": 6 },
                    { "response": "I just want to relax", "responseNumber": 3, "destination": 8, "weighting": 8 },
                    { "response": "I want to do everything", "responseNumber": 4, "destination": 2, "weighting": 5 },
                ]
            },
            {
                "question": "Who are you travelling with?",
                "questionImage": "https://images.unsplash.com/photo-1566740013712-556707c2aada?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
                "destinationMapping": [
                    { "response": "The family", "responseNumber": 1, "destination": 1, "weighting": 6 },
                    { "response": "Friends", "responseNumber": 2, "destination": 7, "weighting": 9 },
                    { "response": "Signicant Other", "responseNumber": 3, "destination": 9, "weighting": 7 },
                    { "response": "Solo", "responseNumber": 4, "destination": 3, "weighting": 4 },
                ]
            },
            {
                "question": "How long do you want to travel for?",
                "questionImage": "https://images.unsplash.com/photo-1435527173128-983b87201f4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=867&q=80",
                "destinationMapping": [
                    { "response": "A weekend", "responseNumber": 1, "destination": 12, "weighting": 5 },
                    { "response": "A week", "responseNumber": 2, "destination": 6, "weighting": 6 },
                    { "response": "Two weeks", "responseNumber": 3, "destination": 13, "weighting": 8 },
                    { "response": "A month", "responseNumber": 4, "destination": 14, "weighting": 7 },
                ]
            },
            {
                "question": "Which activity do you like most?",
                "questionImage": "https://images.unsplash.com/photo-1621886292650-520f76c747d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
                "destinationMapping": [
                    { "response": "Visit museums", "responseNumber": 1, "destination": 2, "weighting": 5 },
                    { "response": "Explore Ancient Relics", "responseNumber": 2, "destination": 11, "weighting": 8 },
                    { "response": "Hike through mountains", "responseNumber": 3, "destination": 6, "weighting": 4 },
                    { "response": "Sunbathe on the beach", "responseNumber": 4, "destination": 8, "weighting": 8 },
                ]
            },
            {
                "question": "Which food are you most likely to try?",
                "questionImage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                "destinationMapping": [
                    { "response": "Anything sweet", "responseNumber": 1, "destination": 2, "weighting": 6 },
                    { "response": "Nothing too spicy", "responseNumber": 2, "destination": 3, "weighting": 6 },
                    { "response": "Anything!", "responseNumber": 3, "destination": 6, "weighting": 8 },
                    { "response": "You're very picky", "responseNumber": 4, "destination": 12, "weighting": 5 },
                ]
            },
            {
                "question": "What type of footwear define you?",
                "questionImage": "https://images.unsplash.com/photo-1528669697102-a6edb9b6a282?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                "destinationMapping": [
                    { "response": "Hiking boots", "responseNumber": 1, "destination": 7, "weighting": 6 },
                    { "response": "Leather dress shoes", "responseNumber": 2, "destination": 12, "weighting": 9 },
                    { "response": "Runners", "responseNumber": 3, "destination": 10, "weighting": 7 },
                    { "response": "Sandals", "responseNumber": 4, "destination": 8, "weighting": 5 },
                ]
            },
            {
                "question": "What's your favourite aspect of a holiday?",
                "questionImage": "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                "destinationMapping": [
                    { "response": "Immersing in different cultures", "responseNumber": 1, "destination": 13, "weighting": 6 },
                    { "response": "Delving into the history of a place", "responseNumber": 2, "destination": 9, "weighting": 6 },
                    { "response": "Exploring nature", "responseNumber": 3, "destination": 1, "weighting": 8 },
                    { "response": "Interacting with locals", "responseNumber": 4, "destination": 8, "weighting": 5 },
                ]
            },
            {
                "question": "Which three words best describe your ideal vacation?",
                "questionImage": "https://images.unsplash.com/photo-1512552288940-3a300922a275?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
                "destinationMapping": [
                    { "response": "Exotic, surprising and serene", "responseNumber": 1, "destination": 12, "weighting": 4 },
                    { "response": "Adventurous, fun and undiscovered", "responseNumber": 2, "destination": 6, "weighting": 6 },
                    { "response": "Luxurious slow paced and beautiful", "responseNumber": 3, "destination": 4, "weighting": 8 },
                    { "response": "Educational, cultural and amusing", "responseNumber": 4, "destination": 9, "weighting": 5 },
                ]
            },
        ]
    );

}

const initializeDestinations = async function () {
    await Destination.collection.drop().catch((err) => { });
    await Destination.insertMany([
        {
            "destinationId": 1, "city": "Vancouver", "country": "Canada", "description": "Vancouver (/vænˈkuːvər/ (listen) van-KOO-vər) is a major city in western Canada, located in the Lower Mainland region of British Columbia. As the most populous city in the province, the 2021 census recorded 662,248 people in the city, up from 631,486 in 2016. The Greater Vancouver area had a population of 2.6 million in 2021, making it the third-largest metropolitan area in Canada. Vancouver has the highest population density in Canada, with over 5,400 people per square kilometre. Vancouver is one of the most ethnically and linguistically diverse cities in Canada: 52 percent of its residents are not native English speakers, 48.9 percent are native speakers of neither English nor French, and 50.6 percent of residents belong to visible minority groups.",
            "image": "https://a.cdn-hotels.com/gdcs/production114/d115/5a3ff7e3-3997-4ccb-8415-00f3302f2d3f.jpg",
            "activityRecommendations": [
                {
                    "activityName": "Granville Island",
                    "activityDescription": "Former industrial site has been transformed into an artsy, posh neighborhood with quaint shops, cafes and bookstores.",
                    "activityImage": "https://images.unsplash.com/photo-1609473749765-70186f204d6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g154943-d156255-Reviews-Granville_Island-Vancouver_British_Columbia.html"
                },
                {
                    "activityName": "Stanley Park",
                    "activityDescription": "North America's third-largest park draws eight million visitors per year, many of whom may skate or walk past you on the Seawall, a scenic, 5.5-mile path running along the water on the park's perimeter. It's just one of many trails among the park's 1,000 acres, which also house an aquarium, nature center and other recreational facilities.",
                    "activityImage": "https://images.unsplash.com/uploads/1413142095961484763cf/d141726c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g154943-d155652-Reviews-Stanley_Park-Vancouver_British_Columbia.html"
                },
                {
                    "activityName": "Vancouver Aquarium",
                    "activityDescription": "With over 60,000 amazing aquatic creatures at the Vancouver Aquarium, what will you see today? Stop by and say hi to the adorable sea otters, or come see the mesmerizing jellyfish. Enjoy daily sea lion, otter and penguin experiences, as well as the free-roaming animals found in the popular Amazon gallery. ",
                    "activityImage": "https://images.unsplash.com/photo-1650813864448-9ca7f49c61f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g154943-d155848-Reviews-Vancouver_Aquarium-Vancouver_British_Columbia.html"
                },
                {
                    "activityName": "Queen Elizabeth Park",
                    "activityDescription": "Situated on Little Mountain - the highest point in Vancouver proper - this former rock quarry has been converted into a beautiful city park with flower gardens, public art, grassy knolls, and panoramic views over the city.",
                    "activityImage": "https://images.unsplash.com/photo-1559510904-5039bf9d8f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g154943-d156254-Reviews-Queen_Elizabeth_Park-Vancouver_British_Columbia.html"
                },
                {
                    "activityName": "VanDusen Botanical Garden",
                    "activityDescription": "VanDusen Botanical Garden is a 55-acre oasis in the heart of Vancouver with over 7,500 plant species and varieties from around the world! Spot and photograph local wildlife, find your way through an Elizabethan hedge maze, unwind in a serene setting, dine on the patios of Truffles Cafe or Shaughnessy Restaurant, or browse the garden-themed gift shop.",
                    "activityImage": "https://images.unsplash.com/photo-1578962544226-2fe7f4660c25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g154943-d184433-Reviews-VanDusen_Botanical_Garden-Vancouver_British_Columbia.html"
                }
            ]
        },
        {
            "destinationId": 2, "city": "London", "country": "England", "description": "London is the capital and largest city of England and the United Kingdom, with a population of just over 9 million.[9] It stands on the River Thames in south-east England at the head of a 50-mile (80 km) estuary down to the North Sea, and has been a major settlement for two millennia. The City of London, its ancient core and financial centre, was founded by the Romans as Londinium and retains boundaries close to its medieval ones. Since the 19th century, the name \"London\" has also referred to the metropolis around this core, historically split between the counties of Middlesex, Essex, Surrey, Kent, and Hertfordshire, which largely comprises Greater London, governed by the Greater London Authority. The City of Westminster, to the west of the City of London, has for centuries held the national government and parliament.",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Tower_Bridge_at_Dawn.jpg/440px-Tower_Bridge_at_Dawn.jpg",
            "activityRecommendations": [
                {
                    "activityName": "Tower of London",
                    "activityDescription": "Discover London’s castle – a secure fortress, royal palace and infamous prison where you can explore 1000 years of history. Prepare to be dazzled by the breathtaking, world famous Crown Jewels. ",
                    "activityImage": "https://images.unsplash.com/photo-1590506903984-49154c7ce1a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g186338-d187547-Reviews-Tower_of_London-London_England.html"
                },
                {
                    "activityName": "Tower Bridge",
                    "activityDescription": "An iconic London landmark and one of Britain's best loved historic sites, Tower Bridge is open to the public 363 days a year. Within the Bridge's iconic structure and magnificent Victorian Engine rooms, the Tower Bridge Exhibition is the best way of exploring the most famous bridge in the world! ",
                    "activityImage": "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g186338-d187552-Reviews-Tower_Bridge-London_England.html"
                },
                {
                    "activityName": "Churchill War Rooms",
                    "activityDescription": "Housing the underground nerve centre where the British government directed the Second World War and the award-winning Churchill Museum, Churchill War Rooms is one of London’s must-see attractions.",
                    "activityImage": "https://images.unsplash.com/photo-1648590300221-d55d9084655b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g186338-d194299-Reviews-Churchill_War_Rooms-London_England.html"
                },
                {
                    "activityName": "National Gallery",
                    "activityDescription": "The National Gallery houses the national collection of paintings in the Western European tradition from the 13th to the 19th centuries. It is on show 361 days a year, free of charge.",
                    "activityImage": "https://images.unsplash.com/photo-1586898848626-c72ca0680938?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g186338-d188862-Reviews-National_Gallery-London_England.html"
                },
                {
                    "activityName": "The British Museum",
                    "activityDescription": "A museum of the world, for the world. Discover over two million years of human history and culture. Some of the world-famous objects include the Rosetta Stone, the Parthenon sculptures and Egyptian mummies.",
                    "activityImage": "https://images.unsplash.com/photo-1574515529318-b3a2cd51242e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g186338-d187555-Reviews-The_British_Museum-London_England.html"
                },
            ]
        },
        {
            "destinationId": 3, "city": "Amsterdam", "country": "Netherlands", "description": "Amsterdam (/ˈæmstərdæm/ AM-stər-dam, UK also /ˌæmstərˈdæm/ AM-stər-DAM, Dutch: [ˌɑmstərˈdɑm] (listen), lit. The Dam on the River Amstel) is the capital and most populous city of the Netherlands; with a population of 907,976 within the city proper, 1,558,755 in the urban area and 2,480,394 in the metropolitan area. Found within the Dutch province of North Holland, Amsterdam is colloquially referred to as the \"Venice of the North\", due to the large number of canals which form a UNESCO World Heritage Site.",
            "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Amsterdam_-_Rijksmuseum_-_panoramio_-_Nikolai_Karaneschev.jpg/540px-Amsterdam_-_Rijksmuseum_-_panoramio_-_Nikolai_Karaneschev.jpg",
            "activityRecommendations": [
                {
                    "activityName": "Rijksmuseum",
                    "activityDescription": "The Rijksmuseum is the museum of the Netherlands. The completely renovated Rijksmuseum tells the story of the Netherlands from the Middle Ages to the 20th century. Including works by Rembrandt, Vermeer, Frans Hals, and more! Most famous is Rembrandt's masterpiece the Night Watch. ",
                    "activityImage": "https://images.unsplash.com/photo-1589825743636-cd96373c3319?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g188590-d189379-Reviews-Rijksmuseum-Amsterdam_North_Holland_Province.html"
                },
                {
                    "activityName": "Anne Frank House",
                    "activityDescription": "he Anne Frank House (Dutch: Anne Frank Huis) is a museum dedicated to Jewish wartime diarist Anne Frank. The building is located on a canal called the Prinsengracht, close to the Westerkerk, in central Amsterdam in the Netherlands.",
                    "activityImage": "https://images.unsplash.com/photo-1652470053540-fec83e79dc89?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g188590-d190555-Reviews-Anne_Frank_House-Amsterdam_North_Holland_Province.html"
                },
                {
                    "activityName": "Van Gogh Museum",
                    "activityDescription": "Discover the world's largest collection of works by Dutch painter Vincent van Gogh, featuring masterpieces such as Sunflowers, The Potato Eaters, Almond Blossom and The Bedroom.",
                    "activityImage": "https://images.unsplash.com/photo-1589869571832-6db8facdad09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g188590-d190554-Reviews-Van_Gogh_Museum-Amsterdam_North_Holland_Province.html"
                },
                {
                    "activityName": "The Jordaan",
                    "activityDescription": "This charming neighborhood is Amsterdam's Greenwich Village, with its narrow alleys, leafy canals lined with 17th-century houses, quirky specialty shops, cafes and designer boutiques.",
                    "activityImage": "https://images.unsplash.com/photo-1658422337472-e05166159a7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g188590-d190575-Reviews-The_Jordaan-Amsterdam_North_Holland_Province.html"
                },
                {
                    "activityName": "A'dam Lookout",
                    "activityDescription": "LOOKOUT 360º Amsterdam + sensational swing An iconic viewing point in The Netherlands - A’DAM LOOKOUT, has joined the Eiffel Tower, the Fernsehturm and the London Eye. For the daredevils among us, LOOKOUT also has a further adrenalin kick in store. On the roof is Europe’s highest swing. You swing over the edge of the tower at a thrilling height of almost 100 metres above the ground.",
                    "activityImage": "https://images.unsplash.com/photo-1656701565245-edc2c4a383e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g188590-d10106528-Reviews-A_dam_Lookout-Amsterdam_North_Holland_Province.html"
                }
            ]
        },
        {
            "destinationId": 4, "city": "Dubai", "country": "United Arab Emirates", "description": "Dubai (/duːˈbaɪ/, doo-BY; Arabic: دبي, romanized: Dubayy, IPA: [dʊˈbajj], Gulf Arabic pronunciation: [dəˈbaj]) is the most populous city in the United Arab Emirates (UAE) and the capital of the Emirate of Dubai. Established in the 18th century as a small fishing village, the city grew rapidly in the early 21st century with a focus on tourism and hospitality, having the second most five-star hotels in the world, and the tallest building in the world, the Burj Khalifa.",
            "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            "activityRecommendations": [
                {
                    "activityName": "Burj Khalifa",
                    "activityDescription": "Described as both a ‘Vertical City’ and ‘A Living Wonder,’ Burj Khalifa, developed by Dubai-based Emaar Properties PJSC, is the world’s tallest building. Rising gracefully from the desert, Burj Khalifa honours the city with its extraordinary union of art, engineering and meticulous craftsmanship.",
                    "activityImage": "https://images.unsplash.com/photo-1582120031356-35f21bf61055?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g295424-d676922-Reviews-Burj_Khalifa-Dubai_Emirate_of_Dubai.html"
                },
                {
                    "activityName": "The Dubai Fountain",
                    "activityDescription": "Choreographed to music, the Dubai Fountain shoots water as high as 500 feet –that’s as high as a 50-story building. Designed by creators of the Fountains of Bellagio in Vegas, Dubai Fountain Performances occur daily on the 30-acre Burj Khalifa Lake.",
                    "activityImage": "https://images.unsplash.com/photo-1607208890951-c42e8733ed4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g295424-d1936354-Reviews-The_Dubai_Fountain-Dubai_Emirate_of_Dubai.html"
                },
                {
                    "activityName": "The Dubai Mall",
                    "activityDescription": "This downtown mall is known for luxury stores like Cartier and Harry Winston. It also has an aquarium, ice rink, and 360-degree views of the city from the world’s tallest building, The Burj Khalifa.",
                    "activityImage": "https://images.unsplash.com/photo-1580769285245-c5e80eb5048f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g295424-d1210327-Reviews-The_Dubai_Mall-Dubai_Emirate_of_Dubai.html"
                },
                {
                    "activityName": "Dubai Miracle Garden",
                    "activityDescription": "Miracle Garden is one of a kind in the region and in the world for such a unique display and extravagant outdoor recreational destination. Miracle Garden in its first phase is providing state-of-the-art services and facilities including open parking, VIP parking, sitting areas, prayer room, toilet blocks, ablution facility, security room, first aid room, carts for handicapped visitors, retails and commercial kiosk and all other related services available to facilitate visitors.",
                    "activityImage": "https://images.unsplash.com/photo-1588314941393-af1c493f345c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g295424-d3916661-Reviews-Dubai_Miracle_Garden-Dubai_Emirate_of_Dubai.html"
                },
                {
                    "activityName": "Global Village",
                    "activityDescription": "Global Village is the first family destination for culture, entertainment and shopping in the region. It is a unique and integrated destination to enjoy the world's finest shopping, dining and entertainment experiences and offers guests a wide range of events, shows and activities that are the largest and most varied in the region.",
                    "activityImage": "https://images.unsplash.com/photo-1610208502174-4fcef9ee11ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g295424-d2038312-Reviews-Global_Village-Dubai_Emirate_of_Dubai.html"
                }
            ]
        },
        {
            "destinationId": 6, "city": "Bali", "country": "Indonesia", "description": "Bali (/ˈbɑːli/; Balinese: ᬩᬮᬶ) is a province of Indonesia and the westernmost of the Lesser Sunda Islands. East of Java and west of Lombok, the province includes the island of Bali and a few smaller neighbouring islands, notably Nusa Penida, Nusa Lembongan, and Nusa Ceningan. The provincial capital, Denpasar,[7] is the most populous city in the Lesser Sunda Islands and the second-largest, after Makassar, in Eastern Indonesia. The upland town of Ubud in Greater Denpasar is considered Bali's cultural centre. The province is Indonesia's main tourist destination, with a significant rise in tourism since the 1980s.[8] Tourism-related business makes up 80% of its economy.",
            "image": "https://images.unsplash.com/photo-1604999333679-b86d54738315?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80",
            "activityRecommendations": [
                {
                    "activityName": "Sacred Monkey Forest Sanctuary",
                    "activityDescription": "The mission of The Sacred Monkey Forest Sanctuary (Monkey Forest Ubud) is conserving the area based on the concept of Tri Hita Karana. Based on the concept of Tri Hita Karana, The Monkey Forest Ubud will be a featured of international tourist destination to create peace and harmony to the visitor.",
                    "activityImage": "https://images.unsplash.com/photo-1522598312049-70ccda16fe43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g297701-d378969-Reviews-Sacred_Monkey_Forest_Sanctuary-Ubud_Gianyar_Regency_Bali.html"
                },
                {
                    "activityName": "Mount Agung",
                    "activityDescription": "Mount Agung reaches 1700m, it overlooks Batur Lake (1400m). The climb is an easy morning walk, only 300 elevation difference. A good way to start the day, walking with pets and children.",
                    "activityImage": "https://images.unsplash.com/photo-1552301726-d43f8f24c112?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g294226-d2191080-Reviews-Mount_Agung-Bali.html"
                },
                {
                    "activityName": "Waterbom Bali",
                    "activityDescription": "Exciting water slides slice through 3.8 hectares of landscaped tropical parks providing hours of fun and entertainment for the young and young at heart! World-class slides and rides are built and maintained to strict international safety standards.",
                    "activityImage": "https://images.unsplash.com/photo-1494825253165-ea450b5d5231?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g297697-d386919-Reviews-Waterbom_Bali-Kuta_Kuta_District_Bali.html"
                },
                {
                    "activityName": "Double Six Beach",
                    "activityDescription": "A quiet beach with gorgeous sunsets and golden sand.",
                    "activityImage": "https://images.unsplash.com/photo-1571755931207-3ede68df575a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g469404-d3780963-Reviews-Double_Six_Beach-Seminyak_Kuta_District_Bali.html"
                },
                {
                    "activityName": "Seminyak Beach",
                    "activityDescription": "Seminyak Beach is a beautiful white sandy beach situated in north of Legian Beach. The white sand stretching 3 km from Tuban area has made it a fascination for tourists to visit this place. ",
                    "activityImage": "https://images.unsplash.com/photo-1604155417827-8dc4a57bbd48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1336&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g469404-d1111882-Reviews-Seminyak_Beach-Seminyak_Kuta_District_Bali.html"
                }
            ]
        },
        {
            "destinationId": 8, "city": "Cabo San Lucas", "country": "Mexico", "description": "Cabo San Lucas (Spanish pronunciation: [ˈkaβo san ˈlukas], \"Saint Luke Cape\"), or simply Cabo, is a resort city at the southern tip of the Baja California Peninsula, in the Mexican state of Baja California Sur. As at the 2020 Census, the population of the city was 202,694 inhabitants.[1][2] Cabo San Lucas together with San José del Cabo are collectively known as Los Cabos. Together, they form a metropolitan area of 351,111 inhabitants.",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFwqNfskhOhKZHALogc3qokKwceZzQFg90DA&usqp=CAU",
            "activityRecommendations": [
                {
                    "activityName": "El Arco de Cabo San Lucas",
                    "activityDescription": "Tourists flock to this natural rock formation, a whale-watching site and snorkeling spot.",
                    "activityImage": "https://images.unsplash.com/photo-1604413703617-2daf6ac1aeb9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1142&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g152515-d152880-Reviews-El_Arco_de_Cabo_San_Lucas-Cabo_San_Lucas_Los_Cabos_Baja_California.html"
                },
                {
                    "activityName": "Marina Cabo San Lucas",
                    "activityDescription": "Marina Cabo San Lucas is a world-class destination marina that offers an outstanding range of on-site conveniences for luxury yacht owners, their guests and crew members. ",
                    "activityImage": "https://images.unsplash.com/photo-1541480551145-2370a440d585?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g152515-d680078-Reviews-Marina_Cabo_San_Lucas-Cabo_San_Lucas_Los_Cabos_Baja_California.html"
                },
                {
                    "activityName": "Mt. Solmar",
                    "activityDescription": "A short hike to a gorgeous view of the ocean and surrounding area.",
                    "activityImage": "https://images.unsplash.com/photo-1504814532849-cff240bbc503?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g152515-d4092584-Reviews-Mt_Solmar-Cabo_San_Lucas_Los_Cabos_Baja_California.html"
                },
                {
                    "activityName": "Wild Canyon Adventures",
                    "activityDescription": "Wild Canyon is a world-class adventure park in Los Cabos, where extreme emotions are guaranteed. The moment you get there, you’ll immediately feel captured by its magic.",
                    "activityImage": "https://images.unsplash.com/photo-1543163300-3566d6a3fab0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g152515-d1070811-Reviews-Wild_Canyon_Adventures-Cabo_San_Lucas_Los_Cabos_Baja_California.html"
                },
                {
                    "activityName": "Santa Maria Beach",
                    "activityDescription": "A pristine white sand beach offering spectacular snorkeling.",
                    "activityImage": "https://images.unsplash.com/photo-1514921625564-18f4326e2185?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g152515-d186119-Reviews-Santa_Maria_Beach-Cabo_San_Lucas_Los_Cabos_Baja_California.html"
                }
            ]
        },
        {
            "destinationId": 9, "city": "Paris", "country": "France", "description": "Paris (French pronunciation: ​[paʁi] (listen)) is the capital and most populous city of France, with an estimated population of 2,165,423 residents in 2019 in an area of more than 105 km² (41 sq mi),[4] making it the 34th most densely populated city in the world in 2020.[5] Since the 17th century, Paris has been one of the world's major centres of finance, diplomacy, commerce, fashion, gastronomy, science, and arts, and has sometimes been referred to as the capital of the world. The City of Paris is the centre of the region and province of Île-de-France, or Paris Region, with an estimated population of 12 262 544 in 2019, or about 19% of the population of France.[6] The Paris Region had a GDP of €739 billion ($743 billion) in 2019, which is the highest of Europe.[7] According to the Economist Intelligence Unit Worldwide Cost of Living Survey, in 2021 Paris was the city with the second-highest cost of living in the world, tied with Singapore, and after Tel Aviv.",
            "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
            "activityRecommendations": [
                {
                    "activityName": "Musée d'Orsay",
                    "activityDescription": "This beautiful museum, once a railroad station, now houses a staggering collection of Impressionist art, as well as other items created between 1848 and 1914. In 2011, the museum is running a renovation of the top floor (impressionist gallery).",
                    "activityImage": "https://images.unsplash.com/photo-1632127261553-e9dee1836f89?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g187147-d188150-Reviews-Musee_d_Orsay-Paris_Ile_de_France.html"
                },
                {
                    "activityName": "Cathédrale Notre-Dame de Paris",
                    "activityDescription": "This famous cathedral, a masterpiece of Gothic architecture on which construction began in the 12th century, stands on the Île de la Cité and is the symbolic heart of the city.",
                    "activityImage": "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g187147-d188679-Reviews-Cathedrale_Notre_Dame_de_Paris-Paris_Ile_de_France.html"
                },
                {
                    "activityName": "Sainte-Chapelle",
                    "activityDescription": "The Sainte-Chapelle is the finest royal chapel to be built in France and features a truly exceptional collection of stained-glass windows. It was built in the mid 13th century by Louis IX, at the heart of the royal residence, the Palais de la Cité. It was built to house the relics of the Passion of Christ.",
                    "activityImage": "https://images.unsplash.com/photo-1546444809-d64eccd9fb88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g187147-d190202-Reviews-Sainte_Chapelle-Paris_Ile_de_France.html"
                },
                {
                    "activityName": "Palais Garnier",
                    "activityDescription": "This performance hall hosts opera, ballet and chamber music performances.",
                    "activityImage": "https://images.unsplash.com/photo-1590101998754-bf4c9fbab064?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g187147-d190204-Reviews-Palais_Garnier-Paris_Ile_de_France.html"
                },
                {
                    "activityName": "Eiffel Tower",
                    "activityDescription": "Completed in 1889, this colossal landmark, although initially hated by many Parisians, is now a famous symbol of French civic pride.",
                    "activityImage": "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1101&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g187147-d188151-Reviews-Eiffel_Tower-Paris_Ile_de_France.html"
                }
            ]
        },
        {
            "destinationId": 10, "city": "Oslo", "country": "Norway", "description": "Oslo (/ˈɒzloʊ/ OZ-loh, US also /ˈɒsloʊ/ OSS-loh,[10][11] Norwegian: [ˈʊ̂ʂlʊ ] (listen) or [ˈʊ̂slʊ, ˈʊ̀ʂlʊ]) is the capital and most populous city of Norway. It constitutes both a county and a municipality. The municipality of Oslo had a population of 702,543 in 2022, while the city's greater urban area had a population of 1,019,513 in 2019,[12][13] and the metropolitan area had an estimated population of 1.71 million in 2010.",
            "image": "https://images.unsplash.com/photo-1613567993548-b3a0d9abb736?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1341&q=80",
            "activityRecommendations": [
                {
                    "activityName": "Fram Museum",
                    "activityDescription": " number of new attractions were available for the visitors at the Fram Museum, the highlight being the continuous 270 degrees surround film shown from the deck of Fram. ",
                    "activityImage": "https://images.unsplash.com/photo-1658132536586-21f91d77717b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g190479-d656587-Reviews-Fram_Museum-Oslo_Eastern_Norway.html"
                },
                {
                    "activityName": "Viking Ship Museum",
                    "activityDescription": "Come face to face with some of the world's greatest Viking treasures! Experience the best-preserved Viking Ships in the world and unique burial artefacts from boat graves around the Oslo Fjord. ",
                    "activityImage": "https://images.unsplash.com/photo-1650499320346-174650da81e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g190479-d206464-Reviews-Viking_Ship_Museum-Oslo_Eastern_Norway.html"
                },
                {
                    "activityName": "Vigeland Park",
                    "activityDescription": "The Vigeland Park is the world's largest sculpture park made by a single artist, and is one of Norway's most popular tourist attractions",
                    "activityImage": "https://images.unsplash.com/photo-1589109139946-d8f9a6e2fbda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g190479-d9602729-Reviews-Vigeland_Park-Oslo_Eastern_Norway.html"
                },
                {
                    "activityName": "Norsk Folkemuseum",
                    "activityDescription": "Norsk Folkemuseum shows how people lived in Norway from 1500 to the present through its collections from around the country. Among the highlights are the Stave Church from Gol, dating from 1200 and an apartment building with homes from the 20th Century. ",
                    "activityImage": "https://images.unsplash.com/photo-1635008695297-b3b5e2972fd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g190479-d246066-Reviews-Norsk_Folkemuseum-Oslo_Eastern_Norway.html"
                },
                {
                    "activityName": "The Norwegian National Opera & Ballet",
                    "activityDescription": "Norway’s tradition of opera is by modern standards fairly recent. The world-famous soprano Kirsten Flagstad put the country on the map after her debut at the Met in 1935, and she became the country’s first Opera Director in 1957. The Norwegian National Opera and Ballet Company ensued, and garnered enough attention and resources to build a home for their performances.",
                    "activityImage": "https://images.unsplash.com/photo-1599951611617-2e4df29385b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g190479-d1902077-Reviews-The_Norwegian_National_Opera_Ballet-Oslo_Eastern_Norway.html"
                }
            ]
        },
        {
            "destinationId": 11, "city": "Rome", "country": "Italy", "description": "Rome (Italian and Latin: Roma [ˈroːma] (listen)) is the capital city of Italy. It is also the capital of the Lazio region, the centre of the Metropolitan City of Rome, and a special comune named Comune di Roma Capitale. With 2,860,009 residents in 1,285 km2 (496.1 sq mi),[1] Rome is the country's most populated comune and the third most populous city in the European Union by population within city limits. The Metropolitan City of Rome, with a population of 4,355,725 residents, is the most populous metropolitan city in Italy.[2] Its metropolitan area is the third-most populous within Italy.[3] Rome is located in the central-western portion of the Italian Peninsula, within Lazio (Latium), along the shores of the Tiber. Vatican City (the smallest country in the world)[4] is an independent country inside the city boundaries of Rome, the only existing example of a country within a city. Rome is often referred to as the City of Seven Hills due to its geographic location, and also as the \"Eternal City\".[5] Rome is generally considered to be the \"cradle of Western civilization and Christian culture\", and the centre of the Catholic Church.",
            "image": "https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
            "activityRecommendations": [
                {
                    "activityName": "Pantheon",
                    "activityDescription": "Dedicated to the seven planetary divinities and featuring an interior of gorgeous marble, the Pantheon is one of the most impressive monuments of Augustan Rome",
                    "activityImage": "https://images.unsplash.com/photo-1614354987493-a010f414d0d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g187791-d197714-Reviews-Pantheon-Rome_Lazio.html"
                },
                {
                    "activityName": "Colosseum",
                    "activityDescription": "Perhaps the best-preserved of the monuments of ancient Rome, this huge marble structure was built to hold more than 50,000 spectators to witness bloody contests of might and the slaughter of wild beasts.",
                    "activityImage": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1096&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g187791-d192285-Reviews-Colosseum-Rome_Lazio.html"
                },
                {
                    "activityName": "Roman Forum",
                    "activityDescription": "If you're in love with Roman architecture and history, then the Roman Forum will simply leave you speechless! Every corner of it bears the gems of Roman history, giving you the chance to walk among the streets where history actually happened. This iconic place should not be missed if you're visiting the Eternal City! ",
                    "activityImage": "https://images.unsplash.com/photo-1558594144-7eeeaa34d22b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1336&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g187791-d2154770-Reviews-Roman_Forum-Rome_Lazio.html"
                },
                {
                    "activityName": "Palatine Hill",
                    "activityDescription": "The commercial, political and religious center of ancient Rome, which features the Arch of Septimus Severus, Temple of Saturn, Arch of Titus and the House of the Vestals.",
                    "activityImage": "https://images.unsplash.com/photo-1593522836121-4c339e12aa84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g187791-d190996-Reviews-Palatine_Hill-Rome_Lazio.html"
                },
                {
                    "activityName": "Piazza Navona",
                    "activityDescription": "The most outstanding square of the Baroque period in Rome features Bernini's Fountain of Rivers at its center as it faces Borromini's church, Sant' Agnese in Agone.",
                    "activityImage": "image.png",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g187791-d190121-Reviews-Piazza_Navona-Rome_Lazio.html"
                }
            ]
        },
        {
            "destinationId": 12, "city": "New York", "country": "United States", "description": "New York, often called New York City (NYC) to distinguish it from the State of New York, is the most populous city in the United States. With a 2020 population of 8,804,190 distributed over 300.46 square miles (778.2 km2), New York City is also the most densely populated major city in the United States. Located at the southern tip of the state of New York, the city is the center of the New York metropolitan area, the largest metropolitan area in the world by urban landmass.[9] With over 20.1 million people in its metropolitan statistical area and 23.5 million in its combined statistical area as of 2020, New York is one of the world's most populous megacities. New York City is a global cultural, financial, and media center with a significant influence on commerce, entertainment, research, technology,[10] education, politics, tourism, dining, art, fashion, and sports. New York is the most photographed city in the world.[11] Home to the headquarters of the United Nations, New York is an important center for international diplomacy,[12][13] an established safe haven for global investors,[14] and is sometimes described as the capital of the world.",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdPazUBc0TPKLzjzDOWTUZhm3Lku7_yGMt_w&usqp=CAU",
            "activityRecommendations": [
                {
                    "activityName": "The National 9/11 Memorial & Museum",
                    "activityDescription": "Through commemoration, exhibitions and educational programs, The National September 11 Memorial & Museum, a nonprofit in New York City, remembers and honors the 2,983 people killed in the horrific attacks of September 11, 2001, and February 26, 1993, as well as those who risked their lives to save others and all who demonstrated extraordinary compassion in the aftermath of the attacks.",
                    "activityImage": "https://images.unsplash.com/photo-1656427787781-7c52de282dd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g60763-d1687489-Reviews-The_National_9_11_Memorial_Museum-New_York_City_New_York.html"
                },
                {
                    "activityName": "The Metropolitan Museum of Art",
                    "activityDescription": "At New York City's most visited museum and attraction, you will experience over 5,000 years of art from around the world. The Met is for anyone as a source of inspiration, insight and understanding.",
                    "activityImage": "https://images.unsplash.com/photo-1584994799933-e4f717e88632?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g60763-d105125-Reviews-The_Metropolitan_Museum_of_Art-New_York_City_New_York.html"
                },
                {
                    "activityName": "Central Park",
                    "activityDescription": "For more than 150 years, visitors have flocked to Central Park's 843 green acres in the heart of Manhattan. Since 1980, the Park has been managed by the Central Park Conservancy, in partnership with the public. Central Park is open 6 am to 1 am daily.",
                    "activityImage": "https://images.unsplash.com/photo-1575372587186-5012f8886b4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g60763-d105127-Reviews-Central_Park-New_York_City_New_York.html"
                },
                {
                    "activityName": "Empire State Building",
                    "activityDescription": "The Empire State Building is the World's Most Famous Building. It rises 1,454 ft from ground to antenna & features the only 360 degree open-air vantage point of Midtown. The 86th & 102nd Fl Observatories are open daily, 10AM-12AM. ",
                    "activityImage": "https://images.unsplash.com/photo-1555109307-f7d9da25c244?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g60763-d104365-Reviews-Empire_State_Building-New_York_City_New_York.html"
                },
                {
                    "activityName": "Top of the Rock",
                    "activityDescription": "Top of the Rock Observation Deck, the newly opened, 3-tiered observation deck on the 67th, 69th and 70th floors of 30 Rockefeller Plaza, is New York City's most amazing attraction! ",
                    "activityImage": "https://images.unsplash.com/photo-1548263650-80eb249e782e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g60763-d587661-Reviews-Top_of_the_Rock-New_York_City_New_York.html"
                }
            ]
        },
        {
            "destinationId": 13, "city": "Kyushi", "country": "Japan", "description": "Kyushu (九州, Kyūshū, pronounced [kʲɯꜜːɕɯː] (listen), literally \"Nine Provinces\") is the third-largest island of Japan's five main islands and the most southerly of the four largest islands (i.e. excluding Okinawa).[3][4] In the past, it has been known as Kyūkoku (九国, \"Nine Countries\"), Chinzei (鎮西, \"West of the Pacified Area\") and Tsukushi-no-shima (筑紫島, \"Island of Tsukushi\"). The historical regional name Saikaidō (西海道, lit. West Sea Circuit) referred to Kyushu and its surrounding islands. Kyushu has a land area of 36,782 square kilometres (14,202 sq mi) and a population of 14,311,224 in 2018.",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfYy1KMtzIc2KgbK02Jr4azCfcjJQ6HtXWxQ&usqp=CAU",
            "activityRecommendations": [
                {
                    "activityName": "Uminonakamichi Seaside Park",
                    "activityDescription": "Uminonakamichi Seaside Park is an extensive leisure park where you can enjoy seasonal flowers. Many events are held here in each season; Flower Picnic (spring), Rose Festival (early summer and autumn) and Cosmos Festival (autumn). ",
                    "activityImage": "https://images.unsplash.com/photo-1550303435-1703d8811aaa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g298207-d1423810-Reviews-Uminonakamichi_Seaside_Park-Fukuoka_Fukuoka_Prefecture_Kyushu.html"
                },
                {
                    "activityName": "Nikko Tosho-gu",
                    "activityDescription": "Toshogu Shrine is a magnificent memorial to Tokugawa Ieyasu, the founder of the Tokugawa Shogunate, which ruled Japan for over 250 years. The lavishly decorated shrine complex consists of more than a dozen buildings set in a beautiful forest.",
                    "activityImage": "https://images.unsplash.com/photo-1624577946147-919174206a6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1168&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g298182-d1311878-Reviews-Nikko_Tosho_gu-Nikko_Tochigi_Prefecture_Kanto.html"
                },
                {
                    "activityName": "Nagasaki Atomic Bomb Museum",
                    "activityDescription": "Jarring, horrific reminders of the devastation caused by the August 9, 1945 bombing of Nagasaki fill this historic and educational museum, which traces events preceding the bombing, the resulting destruction and the city’s restoration.",
                    "activityImage": "https://images.unsplash.com/photo-1646657258114-8f06720d82d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g298568-d324024-Reviews-Nagasaki_Atomic_Bomb_Museum-Nagasaki_Nagasaki_Prefecture_Kyushu.html"
                },
                {
                    "activityName": "Sengan-en",
                    "activityDescription": "Sengan-en is a traditional Japanese garden and stately home that has been passed down in the Shimadzu family for over 350 years. The garden boasts spectacular views of active volcano Sakurajima, and the house provides a glimpse into the lifestyle of a powerful feudal lord.",
                    "activityImage": "https://images.unsplash.com/photo-1578367308725-93f9108b1301?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g298211-d324652-Reviews-Sengan_en-Kagoshima_Kagoshima_Prefecture_Kyushu.html"
                },
                {
                    "activityName": "Hells of Beppu",
                    "activityDescription": "These eight boiling pools resulting from volcanic activity have varying characteristics: one is blood-red in color due to its red clay deposits, another has the largest geyser in Japan, and still another is used for breeding crocodiles.",
                    "activityImage": "https://images.unsplash.com/photo-1624517607060-b0bfafdb19a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g298219-d320318-Reviews-Hells_of_Beppu-Beppu_Oita_Prefecture_Kyushu.html"
                }
            ]
        },
        {
            "destinationId": 14, "city": "Singapore", "country": "Singapore", "description": "Singapore (/ˈsɪŋ(ɡ)əpɔːr/ (listen)), officially the Republic of Singapore, is a sovereign island country and city-state in maritime Southeast Asia. It lies about one degree of latitude (137 kilometres or 85 miles) north of the equator, off the southern tip of the Malay Peninsula, bordering the Strait of Malacca to the west, the Singapore Strait to the south, the South China Sea to the east and the Straits of Johor to the north. The country's territory is composed of one main island, 63 satellite islands and islets, and one outlying islet, the combined area of which has increased by 25% since the country's independence as a result of extensive land reclamation projects. It has the third highest population density in the world. With a multicultural population and recognising the need to respect cultural identities of the major ethnic groups within the nation, Singapore has four official languages; English, Malay, Mandarin, and Tamil. English is the lingua franca and numerous public services are available only in English. Multiracialism is enshrined in the constitution and continues to shape national policies in education, housing, and politics.",
            "image": "https://images.unsplash.com/photo-1496939376851-89342e90adcd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            "activityRecommendations": [
                {
                    "activityName": "Gardens by the Bay",
                    "activityDescription": "An integral part of Singapore's 'City in a Garden' vision, Gardens by the Bay spans a total of 101 hectares of prime land at the heart of Singapore's new downtown - Marina Bay. ",
                    "activityImage": "https://images.unsplash.com/photo-1508597370841-836e72ef6f54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g294265-d2149128-Reviews-Gardens_by_the_Bay-Singapore.html"
                },
                {
                    "activityName": "Singapore Botanic Gardens",
                    "activityDescription": "This national park is open daily and features beautiful lakes, animals, flowers and plants, including one of the region's first rubber tree orchards.",
                    "activityImage": "https://images.unsplash.com/photo-1578208068020-4188dadc767c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1249&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g294265-d310900-Reviews-Singapore_Botanic_Gardens-Singapore.html"
                },
                {
                    "activityName": "Singapore Zoo",
                    "activityDescription": "Set in a rainforest environment, Singapore Zoo is home to over 2,800 animals from over 300 species of mammals, birds and reptiles. The park also boasts the world's first free-ranging orang utan habitat in a zoo. ",
                    "activityImage": "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g294265-d324542-Reviews-Singapore_Zoo-Singapore.html"
                },
                {
                    "activityName": "National Orchid Garden",
                    "activityDescription": "A beautiful display of colour through perfect flowers blooming every season.",
                    "activityImage": "https://images.unsplash.com/photo-1658520299035-f4a9c3b1652d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g294265-d317453-Reviews-National_Orchid_Garden-Singapore.html"
                },
                {
                    "activityName": "Cloud Forest",
                    "activityDescription": "This is one of the best parts of gardens by the bay. It has a really nice variety of plants, and the architecture of the dome is amazing. Each floor has a unique theme, which makes the whole place more interesting. ",
                    "activityImage": "https://images.unsplash.com/photo-1655471994088-4f3c6a560a28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
                    "activityLink": "https://www.tripadvisor.ca/Attraction_Review-g294265-d4400781-Reviews-Cloud_Forest-Singapore.html"
                }
            ]
        },
    ]);
};

const initializeUsers = async function () {
    await User.collection.drop().catch((err) => { });
    await User.insertMany([
        {
            "f_name": "Josh",
            "l_name": "Tillson",
            "country": "Canada",
            "destinations": ["1"],
            "question_responses": [1, 2, 3, 4, 1, 2, 3, 4],
            "email": "josh@tillson.com",
            "password": "1234password"
        },
        {
            "f_name": "Ronin",
            "l_name": "Cunningham",
            "country": "Canada",
            "destinations": ["2"],
            "question_responses": [1, 1, 1, 1, 1, 1, 1, 1],
            "email": "ronin@cunningham.com",
            "password": "1234password"
        },
        {
            "f_name": "Sherman",
            "l_name": "Lam",
            "country": "Canada",
            "destinations": ["1", "2", "3"],
            "question_responses": [1, 2, 1, 2, 1, 2, 1, 2],
            "email": "sherman@lam.com",
            "password": "1234password"
        },
        {
            "f_name": "Kevin",
            "l_name": "Zhao",
            "country": "Canada",
            "destinations": ["1"],
            "question_responses": [2, 3, 4, 4, 4, 3, 3, 2],
            "email": "kevin@zhao.com",
            "password": "1234password"
        },
    ]);
};

module.exports = dbSetUp;