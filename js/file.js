$(".imgBtn").on("click", imgClick);
$(".videoBtn").on("click", videoClick);
$(".imgFile").on("change", fileCk.bind(true, "img"));
$(".videoFile").on("change", fileCk.bind(true, "video"));

function imgClick() {
	$(".imgFile").click();
}
function videoClick() {
	$(".videoFile").click();
}


function fileCk(type, e) {
	console.log(1);
	if (e.target.files.length > 18) {
		alert("파일을 최대 18개 까지 등록가능합니다.")
		return;
	} else if (e.target.files.length === 0) {
		return;
	} else {
		let count = 0;
		let files = [];
		let rows = document.querySelectorAll(".fileInsert .row")
		rows.forEach(row => {
			if (type === "img") {
				row.querySelectorAll(".img").forEach(img => {
					files.push(img)
				})
			} else if (type === "video") {
				row.querySelectorAll(".video").forEach(video => {
					files.push(video)
				})
			}
			row.querySelectorAll(".img").forEach(img => {
				count++;
			})
			row.querySelectorAll(".video").forEach(video => {
				count++;
			})
		})
		if ((count + e.target.files.length) > 18) {
			alert("파일을 최대 18개 까지 등록가능합니다.")
			return;
		}
		files.forEach(file => {
			file.remove();
		})
		if (type === "img") {
			fileLoad(e.target, "img");
		} else if (type === "video") {
			fileLoad(e.target, "video");
		}
	}
}

function dragEvent() { /* 드레그 & 드롭 이벤트 */
	let file = document.querySelectorAll(".draggable") // 이미지 의 div 태그들
	let containers = document.querySelectorAll(".contain"); // 이미지 들의 row 태그
	file.forEach(draggable => {
		draggable.addEventListener("dragstart", () => { // 드래그 시작시 dragging 클래스 추가
			draggable.classList.add("dragging");
		});

		draggable.addEventListener("click", (e) => { // 클릭하면 우측 전체보기
			let mainFile = document.querySelector(".mainfile")
			let parent = mainFile.parentNode;
			if (e.target.tagName === "IMG") {
				if (mainFile.tagName === "IMG") {
					mainFile.src = e.target.src;
				} else if (mainFile.tagName === "VIDEO") {
					mainFile.remove();
					let img = document.createElement("img")
					img.src = e.target.src;
					img.classList.add("mainfile");
					img.classList.add("ui");
					img.classList.add("fluid");
					img.classList.add("image");
					img.classList.add("rounded")
					img.draggable = false;
					parent.appendChild(img);
				}
			} else if (e.target.tagName === "VIDEO") {
				if (mainFile.tagName === "IMG") {
					mainFile.remove();
					let video = document.createElement("video")
					video.src = e.target.src;
					video.preload = "mntadata"
					video.controls = true;
					video.classList.add("mainfile");
					video.classList.add("ui");
					video.classList.add("fluid");
					video.classList.add("image");
					video.classList.add("rounded");
					video.draggable = false
					parent.appendChild(video);
				} else if (mainFile.tagName === "VIDEO") {
					mainFile.src = e.target.src;
				}
			}
		})

		draggable.querySelectorAll("button").forEach(button => { // 이미지 삭제
			button.addEventListener("click", (e) => {
				let boo = false;
				let target = e.target;
				while (!boo) {
					if (target.tagName === "DIV") {
						boo = true;
						target.remove();
						sort();
						let mainFile = document.querySelector(".mainfile")
						let parent = mainFile.parentNode;
						let row = document.querySelectorAll(".fileInsert .row");
						let child = row[0].firstChild;
						let imgOrVideo = "";

						if(target.querySelector("img")!== null) {
							imgOrVideo = target.querySelector("img").src;
						} else if (target.querySelector("video")!== null) {
							imgOrVideo = target.querySelector("video").src;
						}

						if(mainFile.src === imgOrVideo) { // 메인 파일과 삭제하려는 파일의 src 확인

							if(mainFile.tagName === "IMG") { // 메인 파일이 이미지인 경우
								if (child === null) { // 첫번째 파일이 없으면 메인 파일을 기본으로 변경
									mainFile.src = require("./img/wireframe/image.png");
								} else if(child.querySelector("img") !== null) { // 이미지 이미지
									mainFile.src = child.querySelector("img").src; // 같을 경우 이미지만 첫번째 파일로 변경
								} else if(child.querySelector("video") !== null) { // 이미지 비디오
									mainFile.remove(); // 다를 경우 비디오 파일로 변경하고 src 변경
									let video = document.createElement("video")
									video.src = child.querySelector("video").src
									video.controls = true;
									video.preload = "mntadata"
									video.classList.add("mainfile");
									video.classList.add("ui");
									video.classList.add("fluid");
									video.classList.add("image");
									video.classList.add("rounded");
									video.draggable = false
									parent.appendChild(video);
								}
							} else if (mainFile.tagName === "VIDEO") { // 메인 파일이 비디오인 경우
								if (child === null) { // 첫번째 파일이 없으면 비디오 파일을 지우도 이미지로 변경
									mainFile.remove();
									let img = document.createElement("img")
									img.src = require("./img/wireframe/image.png");
									img.classList.add("mainfile");
									img.classList.add("ui");
									img.classList.add("fluid");
									img.classList.add("image");
									img.classList.add("rounded");
									img.draggable = false
									parent.appendChild(img);
								} else if(child.querySelector("img") !== null) { // 비디오 이미지
									mainFile.remove(); // 다를 경우 이미지로 변경
									let img = document.createElement("img")
									img.src = child.querySelector("img").src;
									img.classList.add("mainfile");
									img.classList.add("ui");
									img.classList.add("fluid");
									img.classList.add("image");
									img.classList.add("rounded");
									img.draggable = false
									parent.appendChild(img);
								} else if(child.querySelector("video") !== null) { // 비디오 비디오
									mainFile.src = child.querySelector("video").src; // 같은 경우 src만 변경
								}
							}

						}

					} else {
						target = target.parentNode;
					}
				}
			})
		})

		draggable.addEventListener("dragend", () => { // 드래그 종료시 dragging 클래스 제거 및 3줄 정렬
			draggable.classList.remove("dragging");
		});
	})

	containers.forEach(container => {
		container.addEventListener("dragover", (e) => {
			e.preventDefault();
		})
	})

	containers.forEach(container => {
		container.addEventListener("drop", (e) => {
			e.preventDefault();
			const afterElement = getDragAfterElement(container, e.clientX);
			const draggable = document.querySelector(".dragging");
			if (afterElement === undefined) {
				container.appendChild(draggable);
			} else {
				container.insertBefore(draggable, afterElement);
			}
		})
	})
	containers.forEach(container => {
		container.addEventListener("dragenter", (e) => {
			e.preventDefault();
			const afterElement = getDragAfterElement(container, e.clientX);
			const draggable = document.querySelector(".dragging");
			if (afterElement === undefined) {
				container.appendChild(draggable);
			} else {
				container.insertBefore(draggable, afterElement);
			}
		})
	})
	containers.forEach(container => {
		container.addEventListener("dragleave", (e) => {
			e.preventDefault();
			const afterElement = getDragAfterElement(container, e.clientX);
			const draggable = document.querySelector(".dragging");
			if (afterElement === undefined) {
				container.appendChild(draggable);
			} else {
				container.insertBefore(draggable, afterElement);
			}
		})
	})

	function getDragAfterElement(container, x) {
		const draggableElements = [
			...container.querySelectorAll(".draggable:not(.dragging)"),
		];
		return draggableElements.reduce(
			(closest, child) => {
				const box = child.getBoundingClientRect();
				const offset = x - box.left - box.width / 2;
				if (offset < 0 && offset > closest.offset) {
					return { offset: offset, element: child };
				} else {
					return closest;
				}
			},
			{ offset: Number.NEGATIVE_INFINITY },

		).element;
	}
}

function sort() {
	let files = document.querySelectorAll(".draggable");
	let row = document.querySelectorAll(".fileInsert .row")
	for (let i = 0; i < row.length; i++) {
		row[i].innerHTML = "";
	}
	for (let i = 0; i < files.length; i++) {
		if (row[0].childNodes.length < 6) {
			row[0].innerHTML += files[i].outerHTML;
		} else if (row[1].childNodes.length < 6) {
			row[1].innerHTML += files[i].outerHTML;
		} else if (row[2].childNodes.length < 6) {
			row[2].innerHTML += files[i].outerHTML;
		}
	}
	dragEvent();
}

function fileLoad(file, type) {
	if (file.files.length > 0) {
		for (let i = 0; i < file.files.length; i++) {
			let reader = new FileReader();
			reader.onload = (e) => {
				let div = document.createElement("div");
				div.classList.add("column");
				div.classList.add("relative");
				div.classList.add("cursor_pointer");
				div.classList.add("draggable");
				let ai = document.createElement("i");
				ai.classList.add("arrows");
				ai.classList.add("alternate");
				ai.classList.add("icon");
				ai.classList.add("absolute");
				ai.classList.add("TL");
				div.appendChild(ai);
				if (type === "video") {
					div.classList.add("video");
					let video = document.createElement("video");
					video.src = e.target.result;
					video.classList.add("ui");
					video.classList.add("fluid");
					video.classList.add("image");
					video.classList.add("rounded");
					video.controls = false;
					video.preload = "mntadata"
					video.src = e.target.result;
					div.appendChild(video);
				} else if (type === "img") {
					div.classList.add("img");
					let img = document.createElement("img");
					img.src = e.target.result;
					img.classList.add("ui");
					img.classList.add("fluid");
					img.classList.add("image");
					img.classList.add("rounded");
					div.appendChild(img);
				}
				let button = document.createElement("button");
				button.type = "button";
				button.classList.add("ui");
				button.classList.add("icon");
				button.classList.add("button");
				button.classList.add("mini");
				button.classList.add("negative");
				button.classList.add("absolute");
				button.classList.add("BRI");
				let bi = document.createElement("i");
				bi.classList.add("times");
				bi.classList.add("icon");
				button.appendChild(bi);
				div.appendChild(button);
				let row = document.querySelectorAll(".fileInsert .row")
				if (row[0].childNodes.length < 6) {
					row[0].appendChild(div);
				} else if (row[1].childNodes.length < 6) {
					row[1].appendChild(div);
				} else if (row[2].childNodes.length < 6) {
					row[2].appendChild(div);
				}
				sort();
			}
			reader.readAsDataURL(file.files[i]);
		}
		if (file.files.length > 0) {
			let read = new FileReader();
			read.onload = (e) => {
				let mainFile = document.querySelector(".mainfile")
				let parent = mainFile.parentNode;

				if (type === "img") {
					if (mainFile.tagName === "IMG") {
						mainFile.src = e.target.result;
					} else if (mainFile.tagName === "VIDEO") {
						mainFile.remove();
						let img = document.createElement("img")
						img.src = e.target.result;
						img.classList.add("mainfile");
						img.classList.add("ui");
						img.classList.add("fluid");
						img.classList.add("image");
						img.classList.add("rounded");
						img.draggable = false
						parent.appendChild(img);
					}
				} else if (type === "video") {
					if (mainFile.tagName === "IMG") {
						mainFile.remove();
						let video = document.createElement("video")
						video.src = e.target.result;
						video.draggable = false;
						video.controls = true;
						video.preload = "mntadata"
						video.classList.add("mainfile");
						video.classList.add("ui");
						video.classList.add("fluid");
						video.classList.add("image");
						video.classList.add("rounded");
						parent.appendChild(video);
					} else if (mainFile.tagName === "VIDEO") {
						mainFile.src = e.target.result;
					}
				}
			}
			read.readAsDataURL(file.files[0]);
		}
	}
}