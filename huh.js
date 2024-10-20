// Function to open and close the sidenav
function openNav() {
	document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
  }
  
  // Function to handle task checkboxes
  function handleCheckboxes(name) {
	let checkboxes = document.getElementsByName(name);
	checkboxes.forEach((checkbox) => {
	  checkbox.addEventListener("change", function() {
		checkboxes.forEach((c) => {
		  if (c !== this) c.checked = false;
		});
	  });
	});
  }
  
  // Only allow one task to be selected
  handleCheckboxes("task");
  
  // Load user data from local storage
  function loadUserData() {
	const user = JSON.parse(localStorage.getItem('user'));
  
	if (user) {
	  document.getElementById('user-avatar').src = user.avatar;
	  document.getElementById('user-name').textContent = user.name;
  
	  // Load and display points
	  document.getElementById('points-display').textContent = user.points || 0;
	} else {
	  // Redirect to signup if no user is found
	  window.location.href = 'signup.html';
	}
  }
  
  // Save user data to local storage
  function saveUserData(user) {
	localStorage.setItem('user', JSON.stringify(user));
  }
  
  // Initialize user data
  loadUserData();
  
  // Pop-up notification for submission
  document.getElementById("submit-proof-form-btn").addEventListener("click", function() {
	// Get selected task points
	let selectedTaskPoints = 0;
	const selectedTask = document.querySelector('input[name="task"]:checked');
	if (selectedTask) {
	  selectedTaskPoints = parseInt(selectedTask.getAttribute('data-points'), 10);
	}
  
	// Get selected teacher email
	const teacherEmail = document.getElementById('teacher-select').value;
  
	// Get proof description
	const proofDescription = document.getElementById('proof-description').value;
  
	// Update user points
	let user = JSON.parse(localStorage.getItem('user'));
	if (user) {
	  user.points = (user.points || 0) + selectedTaskPoints;
	  saveUserData(user);
  
	  // Update the points display
	  document.getElementById('points-display').textContent = user.points;
	}
  
	// Get current date and format it
	const currentDate = new Date();
	const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  
	// Display pop-up notification
	let popup = document.createElement("div");
	popup.id = "popup-notification";
	popup.innerHTML = `
		  <h3>Submission Successful!</h3>
		  <p>Your proof has been sent to ${teacherEmail}. Points: ${selectedTaskPoints}</p>
		  <p>Description: ${proofDescription}</p>
		  <button id="close-popup-btn">Close</button>
	  `;
	document.body.appendChild(popup);
  
	document.getElementById("popup-notification").style.display = "block";
  
	document.getElementById("close-popup-btn").addEventListener("click", function() {
	  document.getElementById("popup-notification").style.display = "none";
	  document.body.removeChild(popup);
	});
  
	// Add the transaction to the transactions section
	let transactionsSection = document.getElementById('transactions-list');
	let newTransaction = document.createElement('li');
	newTransaction.innerHTML = `
		  <p>Task: ${selectedTask ? selectedTask.value : 'None selected'}</p>
		  <p>Points earned: ${selectedTaskPoints}</p>
		  <p>Date: ${formattedDate}</p>
	  `;
	transactionsSection.appendChild(newTransaction);
  
	// Clear form fields
	document.getElementById('proof-file').value = '';
	document.getElementById('proof-description').value = '';
	document.getElementById('teacher-select').selectedIndex = 0;
  
	// Clear selected task
	document.querySelectorAll('input[name="task"]').forEach(checkbox => checkbox.checked = false);
  });
  
  // Function to handle scrolling to sections
  document.getElementById('view-transactions-btn').addEventListener('click', function() {
	const transactionsSection = document.getElementById('transactions');
  
	// Toggle visibility
	if (transactionsSection.style.display === 'none' || transactionsSection.style.display === '') {
	  transactionsSection.style.display = 'block';
  
	  // Scroll smoothly to the transactions section
	  transactionsSection.scrollIntoView({ behavior: 'smooth' });
	} else {
	  transactionsSection.style.display = 'none';
	}
  });
  
  document.getElementById('submit-proof-btn').addEventListener('click', function() {
	const proofSubmissionSection = document.getElementById('proof-submission');
  
	// Scroll smoothly to the proof-submission section
	proofSubmissionSection.scrollIntoView({ behavior: 'smooth' });
  });
  
  function redirectToScanner() {
	const rewardSelect = document.getElementById('reward-select');
	const selectedReward = rewardSelect.value;
  
	if (selectedReward) {
	  // Redirect to scanner.html if a reward is selected
	  window.location.href = 'scanner.html';
	} else {
	  // Alert the user to select a reward before redeeming
	  alert('Please select a reward before redeeming.');
	}
  }
  
  // Submission logic for proof and notification to teacher
  document.getElementById('submit-proof-btn').addEventListener('click', () => {
	// Collect data
	const teacherEmail = document.getElementById('teacher-select').value;
	const proofDescription = document.getElementById('proof-description').value;
  
	// Create notification message
	const notificationMessage = `New proof submitted by a student. Details: ${proofDescription}`;
  
	// Save notification to localStorage
	let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
	notifications.push({ email: teacherEmail, message: notificationMessage, description: proofDescription });
	localStorage.setItem('notifications', JSON.stringify(notifications));
  
	// Clear form fields
	document.getElementById('proof-file').value = '';
	document.getElementById('proof-description').value = '';
	document.getElementById('teacher-select').selectedIndex = 0;
  
	// Optionally, show a confirmation message
	alert('Proof submitted successfully!');
  });