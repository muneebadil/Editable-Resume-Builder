
const form = document.getElementById('resumeForm') as HTMLFormElement;
const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;


let profileImageDataURL: string | null = null;


const handleImageUpload = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const maxSizeInBytes = 2 * 1024 * 1024; // 2MB limit
        if (file.size > maxSizeInBytes) {
            reject('Image size should not exceed 2MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result as string);
        };
        reader.onerror = () => {
            reject('Error reading image file');
        };
        reader.readAsDataURL(file);
    });
};


const generateResume = async (event: Event) => {
    event.preventDefault(); // Prevent form submission

 
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

   
    const imageInput = document.getElementById('profileImage') as HTMLInputElement;
    if (imageInput.files && imageInput.files[0]) {
        try {
            profileImageDataURL = await handleImageUpload(imageInput.files[0]);
        } catch (error) {
            alert(error); // Alert the user about the error (e.g., large image)
            profileImageDataURL = null;
        }
    }

 
    const resumeHTML = `
        <h2>Resume</h2>
        ${profileImageDataURL ? `<img src="${profileImageDataURL}" alt="Profile Image">` : ''}
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> <span class="editable" contenteditable="true">${name}</span></p>
        <p><strong>Email:</strong> <span class="editable" contenteditable="true">${email}</span></p>
        <p><strong>Phone:</strong> <span class="editable" contenteditable="true">${phone}</span></p>
        <h3>Education</h3>
        <p class="editable" contenteditable="true">${education.replace(/\n/g, '<br>')}</p>
        <h3>Experience</h3>
        <p class="editable" contenteditable="true">${experience.replace(/\n/g, '<br>')}</p>
        <h3>Skills</h3>
        <p class="editable" contenteditable="true">${skills.replace(/\n/g, '<br>')}</p>
    `;

   
    resumeOutput.innerHTML = resumeHTML;

    
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach((element) => {
        element.addEventListener('blur', (event: Event) => {
            const target = event.target as HTMLSpanElement;
            target.innerHTML = target.innerText;
        });
    });
};


form.addEventListener('submit', generateResume);
