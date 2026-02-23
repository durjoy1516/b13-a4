let interviewList = [];
let rejectedList = [];


let totalCount = document.getElementById('totalCount')
let interviewCount = document.getElementById('interviewCount')
let rejectedCount = document.getElementById('rejectedCount')

const allListBtn = document.getElementById('allList-btn')
const interviewListBtn = document.getElementById('interviewList-btn')
const rejectedListBtn = document.getElementById('rejectedList-btn')

const allCardSection = document.getElementById('allCards');
const mainContainer = document.getElementById('mainSection');

function calculateCount(){
    totalCount.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
calculateCount();


function toggleStyle(id){
    // console.log('click', id)
    allListBtn.classList.remove('bg-[#3b82f6]', 'text-[#ffffff]');
    interviewListBtn.classList.remove('bg-[#3b82f6]', 'text-[#ffffff]');
    rejectedListBtn.classList.remove('bg-[#3b82f6]', 'text-[#ffffff]');

    allListBtn.classList.add('bg-[#f1f2f4]', 'text-[#64748b]');
    interviewListBtn.classList.add('bg-[#f1f2f4]', 'text-[#64748b]');
    rejectedListBtn.classList.add('bg-[#f1f2f4]', 'text-[#64748b]');

    // console.log(id);

    const selected = document.getElementById(id);
    // console.log(selected);

    selected.classList.remove('bg-[#f1f2f4]', 'text-[#64748b]');
    selected.classList.add('bg-[#3b82f6]', 'text-[#ffffff]')

}