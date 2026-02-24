let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let totalCount = document.getElementById('totalCount');
let interviewCount = document.getElementById('interviewCount');
let rejectedCount = document.getElementById('rejectedCount');

const allListBtn = document.getElementById('allList-btn');
const interviewListBtn = document.getElementById('interviewList-btn');
const rejectedListBtn = document.getElementById('rejectedList-btn');

const availableCount = document.getElementById('availableCount');

const allCardSection = document.getElementById('allCards');
const allCardList = document.getElementById('allCardList');
const filterSection = document.getElementById('filtered-section');


//no data section
const noDataTemplate = `
<div id="no-data-msg" class="flex flex-col items-center justify-center border border-[#f1f2f4] rounded-md h-[400px] gap-2.5">
    <img src="./images/assignment.png" alt="" class="w-25">
    <h4 class="text-[24px] font-semibold text-[#002c5c] mt-4">No jobs available</h4>
    <p class="text-[16px] text-[#64748b] font-normal">Check back soon for new job opportunities</p>
</div>
`;

//update counts section
function updateAvailableCount(){
    const total = allCardList.children.length;

    if(currentStatus === 'allList-btn'){
        availableCount.innerText = `${total} jobs`;
    }
    else if(currentStatus === 'interviewList-btn'){
        availableCount.innerText = `${interviewList.length} of ${total} jobs`;
    }
    else if(currentStatus === 'rejectedList-btn'){
        availableCount.innerText = `${rejectedList.length} of ${total} jobs`;
    }
}




// calculate counts section
function calculateCount(){
    totalCount.innerText = allCardList.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
    updateAvailableCount();
}
calculateCount();





// toggle tabs section
function toggleStyle(id){

    allListBtn.classList.remove('bg-[#3b82f6]', 'text-[#ffffff]');
    interviewListBtn.classList.remove('bg-[#3b82f6]', 'text-[#ffffff]');
    rejectedListBtn.classList.remove('bg-[#3b82f6]', 'text-[#ffffff]');

    allListBtn.classList.add('bg-[#f1f2f4]', 'text-[#64748b]');
    interviewListBtn.classList.add('bg-[#f1f2f4]', 'text-[#64748b]');
    rejectedListBtn.classList.add('bg-[#f1f2f4]', 'text-[#64748b]');

    const selected = document.getElementById(id);
    selected.classList.remove('bg-[#f1f2f4]', 'text-[#64748b]');
    selected.classList.add('bg-[#3b82f6]', 'text-[#ffffff]');

    currentStatus = id;

    if (id === 'allList-btn'){
        allCardList.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }
    else if (id === 'interviewList-btn'){
        allCardList.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    }
    else if (id === 'rejectedList-btn'){
        allCardList.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }
    updateAvailableCount();
}





// click tabs section
function handleCardClick(container){

    container.addEventListener('click', function(event){
        const card = event.target.closest('.card');
        if (!card) return;

        const compName = card.querySelector('.compName').innerText;
        const position = card.querySelector('.position').innerText;
        const placeNSalary = card.querySelector('.placeNSalary').innerText;
        const notes = card.querySelector('.notes').innerText;


        // interview section
        if (event.target.classList.contains('interviewBtn')){
            card.querySelector('.status').innerText = 'INTERVIEW';

            const cardInfo = {
                compName,
                position,
                placeNSalary,
                status: 'INTERVIEW',
                notes
            };

            if (!interviewList.find(item => item.compName === compName)) {
                interviewList.push(cardInfo);
            }

            rejectedList = rejectedList.filter(item => item.compName !== compName);

            calculateCount();

            renderInterview();

            renderRejected();

            updateAvailableCount();

            if (currentStatus === 'interviewList-btn')
                renderInterview();
        }


        // rejected section
        if (event.target.classList.contains('rejectedBtn')){
            card.querySelector('.status').innerText = 'REJECTED';

            const cardInfo = {
                compName,
                position,
                placeNSalary,
                status: 'REJECTED',
                notes
            };

            if (!rejectedList.find(item => item.compName === compName)) {
                rejectedList.push(cardInfo);
            }

            interviewList = interviewList.filter(item => item.compName !== compName);

            calculateCount();

            renderRejected();

            renderInterview();

            updateAvailableCount();

            if (currentStatus === 'rejectedList-btn')
                renderRejected();
        }


        // delete section
        if (event.target.closest('img')){

            interviewList =
                interviewList.filter(item => item.compName !== compName);

            rejectedList =
                rejectedList.filter(item => item.compName !== compName);

            card.remove();

            calculateCount();

            availableCount.innerText = `${allCardList.children.length} jobs`;


            if (currentStatus === 'interviewList-btn')
                renderInterview();

            if (currentStatus === 'rejectedList-btn')
                renderRejected();

            calculateCount();
        }
    });
}

handleCardClick(allCardList);
handleCardClick(filterSection);



// render interview section
function renderInterview(){

    filterSection.classList.remove('hidden');
    filterSection.innerHTML = '';


    // hidden temp. interv. section
    if (interviewList.length === 0) {
        filterSection.innerHTML = noDataTemplate;
        return;
    }


    // interview card section
    for (let interview of interviewList) {
        const div = document.createElement('div');

        div.className =
            'card flex justify-between px-6 py-5 border border-[#f1f2f4] rounded-md';


        div.innerHTML = `
            <div class="space-y-5">
                <div>
                    <h4 class="compName text-[18px] text-[#002c5c] font-semibold">${interview.compName}</h4>

                    <p class="position text-[16px] text-[#64748bFF] font-normal">${interview.position}</p>
                </div>
                <div>
                    <p class="placeNSalary text-[14px] text-[#64748b] font-normal">${interview.placeNSalary}</p>
                </div>
                <p class="status text-[14px] text-[#002c5c] font-semibold bg-[#eef4ff] py-2 w-32 flex justify-center rounded-md">
                ${interview.status}
                </p>
                <p class="notes text-[14px] text-[#323b49] font-normal">${interview.notes}</p>
                <div class="flex gap-3">
                    <button class="interviewBtn text-[14px] text-[#10b981] font-semibold border border-[#10b981] px-4 py-2 flex justify-center rounded-md">
                    INTERVIEW
                    </button>
                    <button class="rejectedBtn text-[14px] text-[#ef4444] font-semibold border border-[#ef4444] px-4 py-2 flex justify-center rounded-md">
                    REJECTED
                    </button>
                </div>
            </div>

            <div class="mx-6 my-2.5">
                <span>
                    <img src="./images/trash.png" alt="" class="bg-[#ffffff] rounded-full px-2.5 py-2.5 border border-[#f1f2f4]">
                </span>
            </div>
        `;
        filterSection.appendChild(div);
    }
}





// render rejected section
function renderRejected() {

    filterSection.classList.remove('hidden');

    filterSection.innerHTML = '';


    // hidden temp. rejec. section
    if (rejectedList.length === 0) {
        filterSection.innerHTML = noDataTemplate;
        return;
    }


    // rejected card section
    for (let rejected of rejectedList) {

        const div = document.createElement('div');

        div.className =
            'card flex justify-between px-6 py-5 border border-[#f1f2f4] rounded-md';


        div.innerHTML = `
        <div class="space-y-5">
            <div>
                <h4 class="compName text-[18px] text-[#002c5c] font-semibold">${rejected.compName}</h4>
                <p class="position text-[16px] text-[#64748bFF] font-normal">${rejected.position}</p>
            </div>
            <div>
                <p class="placeNSalary text-[14px] text-[#64748b] font-normal">${rejected.placeNSalary}</p>
            </div>
            <p class="status text-[14px] text-[#002c5c] font-semibold bg-[#eef4ff] py-2 w-32 flex justify-center rounded-md">
            ${rejected.status}
            </p>
            <p class="notes text-[14px] text-[#323b49] font-normal">${rejected.notes}</p>
            <div class="flex gap-3">
                <button class="interviewBtn text-[14px] text-[#10b981] font-semibold border border-[#10b981] px-4 py-2 flex justify-center rounded-md">
                INTERVIEW
                </button>
                <button class="rejectedBtn text-[14px] text-[#ef4444] font-semibold border border-[#ef4444] px-4 py-2 flex justify-center rounded-md">
                REJECTED
                </button>
            </div>
        </div>

        <div class="mx-6 my-2.5">
            <span>
                <img src="./images/trash.png" alt="" class="bg-[#ffffff] rounded-full px-2.5 py-2.5 border border-[#f1f2f4]">
            </span>
        </div>
        `;
        filterSection.appendChild(div);
    }
}