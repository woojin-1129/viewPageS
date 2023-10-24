$(document).ready(function () {

	$('.ui.dropdown').dropdown();
	$(".ui.toggle.checkbox input[type=checkbox]").on("change", function (e) {
		let div = e.target.parentNode.parentNode;
		if ($(this).is(':checked')) {
			$(div.querySelector(".disA")).addClass("dis");
			$(div.querySelector(".disB")).removeClass("dis");
		} else {
			$(div.querySelector(".disB")).addClass("dis");
			$(div.querySelector(".disA")).removeClass("dis");
		}
	})

	dragEvent();

	$(".safeStockCheckBox").on("change", safeStock);
	$(".taxClassification").on("change", taxFree);
	$(".name").on("click", block.bind(false, "menu"));
	$(".shortName").on("click", block.bind(false, "menuC"));
	$(".origin").on("click", block.bind(false, "origin"));
	$(".allergy").on("click", block.bind(false, "allergy"));
	$(".recipe").on("click", block.bind(false, "recipe"));
	$(".option").on("click", block.bind(false, "option"));
	$(".newOption").on("click", block.bind(false, "newOption"));
	$(".optionManagement").on("click", block.bind(false, "optionManagement"));
	$(".itemTp").on("change", optionZone.bind(true));
})

// 모달창
function block(view) {
	switch (view) {
		case "option":
			$('.ui.modal.optionDis').modal('setting', 'closable', false).modal('show');
			break;
		case "newOption":
			$('.ui.modal.newOptionDis').modal('setting', 'closable', false).modal('show');
			break;
		case "optionManagement":
			$('.ui.modal.optionManagementDis').modal('setting', 'closable', false).modal('show');
			break;
		case "menu":
			$('.ui.modal.menuDis').modal('setting', 'closable', false).modal('show');
			break;
		case "menuC":
			$('.ui.modal.menuCDis').modal('setting', 'closable', false).modal('show');
			break;
		case "origin":
			$('.ui.modal.originDis').modal('setting', 'closable', false).modal('show');
			break;
		case "allergy":
			$('.ui.modal.allergyDis').modal('setting', 'closable', false).modal('show');
			break;
		case "recipe":
			$('.ui.modal.recipeDis').modal('setting', 'closable', false).modal('show');
			break;
		default:
			break;
	}
}

$(".allergyBtn").on("click", function () {
	$('.ui.modal.allergyDis').modal('hide');
})
$(".recipeBtn").on("click", function () {
	$('.ui.modal.recipeDis').modal('hide');
})
$(".menuBtn").on("click", function () {
	$('.ui.modal.menuDis').modal('hide');
})
$(".menuCBtn").on("click", function () {
	$('.ui.modal.menuCDis').modal('hide');
})
$(".newOptionBtn").on("click", function () {
	$('.ui.modal.newOptionDis').modal('hide');
})
$(".optionBtn").on("click", function () {
	$('.ui.modal.optionDis').modal('hide');
})
$(".optionManagementBtn").on("click", function () {
	$('.ui.modal.optionManagementDis').modal('hide');
})
$(".originBtn").on("click", function () {
	$('.ui.modal.originDis').modal('hide');
})

// 옵션에는 적용되나 모달에는 displaynone 적용안됨 리엑트에서는 적용됨
function optionZone(e) {
	if (e.target.value.includes("Option")) {
		$(".optionZoneDis").removeClass("displaynone");
	} else {
		$(".optionZoneDis").addClass("displaynone");
	}
}

function safeStock(e) {
	if ($(e.target).is(':checked')) {
		$(document.querySelector(".safeStock")).removeClass("readOnly");
		document.querySelector(".safeStock").readOnly = false;
	} else {
		$(document.querySelector(".safeStock")).addClass("readOnly");
		document.querySelector(".safeStock").readOnly = true;
	}
}

function taxFree(e) {
	if (e.target.value === "taxFree") {
		$(".taxPer").addClass("readOnly");
		document.querySelector(".taxPer").readOnly = true;
		document.querySelector(".taxPer").value = 0;
	} else {
		$(".taxPer").removeClass("readOnly");
		document.querySelector(".taxPer").readOnly = false;
	}
}

function RegTest(e) {
	e.target.value = e.target.value.replaceAll(/[ㄱ-ㅎㅏ-ㅣ가-힣]|\.{2}?/g, ""); ///
}
