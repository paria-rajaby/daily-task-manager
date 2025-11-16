const taskInput = document.querySelector("#task-input");
const addTaskBtn = document.querySelector("#addtask_btn");
const tasksContainer = document.querySelector(".middleSection");
const taskWrapper = document.querySelector(".taskwrapper");

const addTask = async () => {
  if (taskInput.value.length === 0) {
    return Swal.fire({
      title: "خطا !",
      text: "لطفا تسک مورد نظر را تایپ کن",
      icon: "error",
      confirmButtonText: "باشه",
    });
  }
  const { value: importance } = await Swal.fire({
    title: "اهمیت این کار چقدره؟",
    input: "radio",
    inputOptions: {
      low: "کم",
      medium: "متوسط",
      high: "زیاد",
    },
    confirmButtonText: "ثبت",
    inputValidator: (value) => {
      if (!value) return "باید یکی رو انتخاب کنی!";
    },
  });
  if (!importance) return;

  let taskData = {
    tasks: taskInput.value,
    important: importance,
  };

  const response = await fetch(
    "https://jfzvtwhwbdgyxhfravtw.supabase.co/rest/v1/tasks",
    {
      method: "POST",
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmenZ0d2h3YmRneXhoZnJhdnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDk2NDIsImV4cCI6MjA3ODc4NTY0Mn0.zgpUGVmygCnXOkVjYVrBnknlaXWR9LiuJDWHpZmkQtI",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmenZ0d2h3YmRneXhoZnJhdnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDk2NDIsImV4cCI6MjA3ODc4NTY0Mn0.zgpUGVmygCnXOkVjYVrBnknlaXWR9LiuJDWHpZmkQtI",
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(taskData),
    }
  );

  const data = await response.json();
  getTasks();

  taskInput.value = "";
};
const getTasks = async () => {
  const loading = document.querySelector(".loading");
  loading.style.display = "block";
  const response = await fetch(
    "https://jfzvtwhwbdgyxhfravtw.supabase.co/rest/v1/tasks?select=*&order=created_at.asc",
    {
      method: "GET",
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmenZ0d2h3YmRneXhoZnJhdnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDk2NDIsImV4cCI6MjA3ODc4NTY0Mn0.zgpUGVmygCnXOkVjYVrBnknlaXWR9LiuJDWHpZmkQtI",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmenZ0d2h3YmRneXhoZnJhdnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDk2NDIsImV4cCI6MjA3ODc4NTY0Mn0.zgpUGVmygCnXOkVjYVrBnknlaXWR9LiuJDWHpZmkQtI",
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  tasksContainer.innerHTML = "";

  if (data.length == 0) {
    tasksContainer.insertAdjacentHTML(
      "beforeend",
      `
        <div class="taskwrapper">
          <span>تسکی برای نمایش وجود ندارد !</span>
        </div>
      `
    );
  } else {
    data.forEach((task) => {
      const divHTML = `
    <div class="taskwrapper">
      <p class="tasktext">${task.tasks}</p>
      <div class="iconswrapper">
          <button  onclick = "editTask('${task.id}' , '${task.tasks}')"><svg><use href="#edit"></use></svg></button>
          <button onclick = "removeTask('${task.id}')"><svg><use href="#trash"></use></svg></button>
      </div>
    </div>
    `;
      tasksContainer.insertAdjacentHTML("beforeend", divHTML);

      const newTaskDiv = tasksContainer.lastElementChild;
      if (task.important === "low") newTaskDiv.classList.add("low");
      else if (task.important === "medium") newTaskDiv.classList.add("medium");
      else newTaskDiv.classList.add("high");
    });
  }
  loading.style.display = "none";
};
const removeTask = async (taskID) => {
  const result = await Swal.fire({
    text: "ایا از حذف این تسک اطمینان دارید ؟",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "خیر",
    confirmButtonColor: "#BEE1E6",
    cancelButtonColor: "#f3999f",
    confirmButtonText: "بله",
  });

  if (!result.isConfirmed) return;

  const response = await fetch(
    `https://jfzvtwhwbdgyxhfravtw.supabase.co/rest/v1/tasks?id=eq.${taskID}`,
    {
      method: "DELETE",
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmenZ0d2h3YmRneXhoZnJhdnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDk2NDIsImV4cCI6MjA3ODc4NTY0Mn0.zgpUGVmygCnXOkVjYVrBnknlaXWR9LiuJDWHpZmkQtI",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmenZ0d2h3YmRneXhoZnJhdnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDk2NDIsImV4cCI6MjA3ODc4NTY0Mn0.zgpUGVmygCnXOkVjYVrBnknlaXWR9LiuJDWHpZmkQtI",
        "Content-Type": "application/json",
      },
    }
  );

  Swal.fire({
    text: "تسک با موفقیت پاک شد .",
    icon: "success",
  });
  getTasks();
};
const editTask = async (taskID, oldTaskText) => {
  const { value: newTaskText } = await Swal.fire({
    title: "ویرایش تسک",
    input: "text",
    inputValue: oldTaskText,
    confirmButtonText: "تایید",
    showCancelButton: true,
    cancelmButtonText: "لغو",
  });
  if (!newTaskText) return;

  if (oldTaskText !== newTaskText) {
    const response = await fetch(
      `https://jfzvtwhwbdgyxhfravtw.supabase.co/rest/v1/tasks?id=eq.${taskID}`,
      {
        method: "PATCH",
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmenZ0d2h3YmRneXhoZnJhdnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDk2NDIsImV4cCI6MjA3ODc4NTY0Mn0.zgpUGVmygCnXOkVjYVrBnknlaXWR9LiuJDWHpZmkQtI",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmenZ0d2h3YmRneXhoZnJhdnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDk2NDIsImV4cCI6MjA3ODc4NTY0Mn0.zgpUGVmygCnXOkVjYVrBnknlaXWR9LiuJDWHpZmkQtI",
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({ tasks: newTaskText }),
      }
    );
    getTasks();
  }
};
const showTime = () => {
  const time = document.querySelector("#time");
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, 0);
  const minutes = now.getMinutes().toString().padStart(2, 0);
  const seconds = now.getSeconds().toString().padStart(2, 0);

  time.innerHTML = `${hours}:${minutes}:${seconds}`;
};
setInterval(showTime, 1000);
addTaskBtn.addEventListener("click", addTask);
window.addEventListener("load", () => {
  showTime();
  getTasks();
});
