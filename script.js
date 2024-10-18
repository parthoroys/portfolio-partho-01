/* ======== Typing animation Start Here ========== */

var typed = new Typed (".typing", {
    strings:["", "Web Designer","Web Developer", "Graphics Designer","SEO Expert"],
    typeSpeed:100,
    BackSpeed:60,
    loop:true
})
/* ======== Aside Start Here ========== */
const nav = document.querySelector(".nav"),
        navList = nav.querySelectorAll("li")
        totalNavList = navList.length;
        allSection = document.querySelectorAll(".section"),
        totalSection = allSection.length
        for(let i=0; i<totalNavList; i++)
        {
            const a = navList[i].querySelector("a");
            a.addEventListener("click", function()
            {
                removeBackSection();
                for(let j=0; j<totalNavList; j++)
                {
                    if(navList[j].querySelector("a").classList.contains("active"))
                        {
                            addBackSection(j);
                            //allSection[j].classList.add("back-section");
                        }
                    navList[j].querySelector("a").classList.remove("active");
                }
                this.classList.add("active")
                showSection(this);
                if(window.innerWidth < 1200)
                {
                    asideSectionTogglerBtn();
                }
            })
        }
        function removeBackSection()
        {
            for(let i=0; i<totalSection; i++)
                {
                    allSection[i].classList.remove("back-section");
                }
        }
        function addBackSection(num)
        {
            allSection[num].classList.add("back-section")
        }
        function showSection(element)
        {
            for(let i=0; i<totalSection; i++)
            {
                allSection[i].classList.remove("active");
            }
            const target = element.getAttribute("href").split("#")[1];
            document.querySelector("#"+ target).classList.add("active")
        }
        function updateNav(element)
        {
            for(let i=0; i<totalNavList; i++)
            {
                navList[i].querySelector("a").classList.remove("active");
                const target = element.getAttribute("href").split("#")[1];
                if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
                {
                    navList[i].querySelector("a").classList.add("active");
                }
            }
        }
        document.querySelector(".hire-me").addEventListener("click", function()
        {
            const sectionIndex = this.getAttribute("data-section-index");
            showSection(this);
            updateNav(this);
            removeBackSection();
            addBackSection(sectionIndex);
        })
        document.querySelector('.btn').addEventListener('click', function() {
            window.location.href = 'https://docs.google.com/document/d/1uPK9wMBzGLWalyOsgAFQyCU6gVA06PD4/edit?usp=sharing&ouid=106381895790731910633&rtpof=true&sd=true';
        });
        
        const navTogglerBtn = document.querySelector(".nav-toggler"),
              aside = document.querySelector(".aside");
              navTogglerBtn.addEventListener("click", () => 
            {
                asideSectionTogglerBtn();
            })
            function asideSectionTogglerBtn()
            {
                aside.classList.toggle("open");
                navTogglerBtn.classList.toggle("open");
                for(let i=0; i<totalSection; i++)
                {
                    allSection[i].classList.toggle("open");
                }
            }
            // contact form submission
            document.querySelector('#submit-form').addEventListener('click', function (e) {
                e.preventDefault(); // Prevent the default form submission
            
                const form = document.querySelector('form[name="contact-form"]');
                const formData = new FormData(form);
                const feedbackDiv = document.getElementById('form-feedback');
                const messageElement = document.getElementById('form-message');
                const spinner = document.getElementById('spinner');
            
                // Clear previous feedback
                feedbackDiv.style.display = 'none';
                messageElement.textContent = '';
            
                // Validate fields
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const whatsapp = document.getElementById('whatsapp').value;
                const address = document.getElementById('address').value;
                const subject = document.getElementById('subject').value;
                const message = document.getElementById('message').value;
            
                if (!isValidName(name)) {
                    displayFeedback('Please enter a valid name.', 'red');
                    return;
                }
                if (!isValidEmail(email)) {
                    displayFeedback('Please enter a valid email address.', 'red');
                    return;
                }
                if (!isValidWhatsApp(whatsapp)) {
                    displayFeedback('Please enter a valid WhatsApp number with country code.', 'red');
                    return;
                }
                if (!isValidAddress(address)) {
                    displayFeedback('Please enter a valid address.', 'red');
                    return;
                }
                if (!isValidSubject(subject)) {
                    displayFeedback('Subject must contain at least 3 valid words.', 'red');
                    return;
                }
                if (!isValidMessage(message)) {
                    displayFeedback('Message must contain at least 10 valid words or one complete sentence.', 'red');
                    return;
                }
            
                // Show spinner and hide feedback
                spinner.style.display = 'block';
            
                fetch(form.action, {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    spinner.style.display = 'none'; // Hide spinner
            
                    // Handle the response and display a success message
                    if (data.result === "success") {
                        messageElement.textContent = "Message sent successfully! Thank you.";
                        feedbackDiv.style.color = "green"; // Success feedback
                    } else {
                        messageElement.textContent = "There was an error. Please try again.";
                        feedbackDiv.style.color = "red"; // Error feedback
                    }
            
                    // Display the feedback and add a fade-in effect
                    feedbackDiv.style.display = 'block';
                    feedbackDiv.style.opacity = '0';
                    setTimeout(() => {
                        feedbackDiv.style.opacity = '1';
                    }, 100);
                    
                    // Clear the form after submission
                    form.reset();
                })
                .catch(error => {
                    spinner.style.display = 'none'; // Hide spinner
                    messageElement.textContent = "An unexpected error occurred. Please try again later.";
                    feedbackDiv.style.color = "red";
                    feedbackDiv.style.display = 'block';
                });
            });
            
            // Validation functions
            function isValidName(name) {
                return name.trim() !== ""; // Checks if name is not empty
            }
            
            function isValidEmail(email) {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format check
                return regex.test(email);
            }
            
            function isValidWhatsApp(whatsapp) {
                const regex = /^\+\d{1,3}\d{1,14}$/; // Validates format like +1234567890
                return regex.test(whatsapp);
            }
            
            function isValidAddress(address) {
                return address.trim() !== ""; // Checks if address is not empty
            }
            
            function isValidSubject(subject) {
                const words = subject.trim().split(/\s+/);
                return words.length >= 1; // Checks for at least 3 words
            }
            
            function isValidMessage(message) {
                const words = message.trim().split(/\s+/);
                return words.length >= 3; // Checks for at least 10 words
            }
            
            function displayFeedback(message, color) {
                const feedbackDiv = document.getElementById('form-feedback');
                const messageElement = document.getElementById('form-message');
                feedbackDiv.style.display = 'block';
                messageElement.textContent = message;
                feedbackDiv.style.color = color;
            }
            
            
            
              