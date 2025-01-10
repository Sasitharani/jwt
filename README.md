# React + Vite

#install
#express
#cors
#axios

#react-router-dom
#sweet alert

#mongo

##########Mongo cluster details################
username:sasitharani
Password:crgYTglszwwKFgOv

conenction string:mongodb+srv://sasitharani:crgYTglszwwKFgOv@contest.iwtzy.mongodb.net/?retryWrites=true&w=majority&appName=contest




#########Sign up Page has the following#########
#Email
#password
#matchPaswword

##########Save Login details for user sessions#############----Currently working done
####################hosted online

IMP### Signup-Login-GoogleLogin working commit

###########working on header###########

###########icon use https://react-icons.github.io/react-icons/search/#q=google###############
The domain is not updated

############Make subscription Model#########

#########Start with maintainanace of login status##########--------done

Take care of duplicate file with same name and diffrent loacations created

Create a table sessions with login details email-session id(unique)--login Time--Login out--Score
Add a column in user database Votes-- member type-- Winning amount--Transfer of amount(Yes/No) 

---Create forgot Password---Done
---File Upload page


03-01-2025
Upload working
You will get a mail in sasitharani@gmail.com
also it is present in uploads folder with date 
GIT COMMIT:"######Finally upload working#######"


Need a page that will show the admin all the images uploaded--working
EOD

06-01-2025
1)Design admin photo selection page.
2)Design user voter page
3)Find how to import photo

All done

07-01-2025
Working On view.
Regulating views.
tommorow create a page that will delete the values in database as well as delete the uploads from the hosting after voting closes
or after a particular time

clear db vote1
Work with Voting Limitations
admin authorisation
if users are loading images and it goes more than 10 how to create a new page after admin approval
create profession email.

Whats app integration
userfeedback
technical error logging

Membership type


###########API Delete Working
#########get all images Working
########Google Login Route Working
########Login Signup working
########Check Email Availability Working
########File Upload Send Email Working
########Reset Password Working
##########Voting working

Have to work on password reset

create a db voteManagement with following column names
SrNo-AutoIncrement-Primary key
Username
email
phone
MaxLikes
LikesUsed
MaxImages
ImagesUploaded
MemeberShip

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      SrNo INT AUTO_INCREMENT PRIMARY KEY,
      Username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      MaxLikes INT DEFAULT 0,
      LikesUsed INT DEFAULT 0,
      MaxImages INT DEFAULT 0,
      ImagesUploaded INT DEFAULT 0,
      Membership VARCHAR(50)
    )
  `;

##########continue with adding usersession and likes start afresh
|



###########Use the Following to Cast a Vote and view the Table####################
    const fetchVotesDetails = async () => {
        try {
            const response = await axios.post('https://jwt-rj8s.onrender.com/api/fetchVotesDetails', {
                username,
                email
            });
            setVotesData(response.data);
            console.log('Response:', response.data);
        } catch (error) {
            Swal.fire('Error', error.response.data, 'error');
        }
    };

    const updateVotes = async () => {
        try {
            const response = await axios.post('https://jwt-rj8s.onrender.com/api/updateVotes', {
                username,
                email
            });
            await fetchVotesDetails(); // Call fetchVotesDetails after updateVotes
        } catch (error) {
            Swal.fire('Error', error.response.data, 'error');
        }
    };

    useEffect(() => {
        fetchVotesDetails(); // Fetch votes details initially
    }, [username, email]);



    #################Use this to only view the table#############
       const fetchVotesDetails = async () => {
        try {
            const response = await axios.post('https://jwt-rj8s.onrender.com/api/fetchVotesDetails', {
                username,
                email
            });
            setVotesData(response.data);
            console.log('Response:', response.data);
        } catch (error) {
            Swal.fire('Error', error.response.data, 'error');
        }
    };