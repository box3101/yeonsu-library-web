// 막대 차트를 그리는 함수(나이)
function drawChartsAge(dataList) {
  var lineChart = $('#myChart1');

  var ctx = document.getElementById('myChart1').getContext('2d');
  if (Chart.getChart(lineChart)) {
    // 기존 차트 삭제
    Chart.getChart(lineChart)?.destroy();
  }

  var labelArr = dataList.map(item => item.age); // 나이 정보
  var dataArr = dataList.map(item => item.loanCnt); // 대출 건수 정보

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelArr,
      datasets: [
        {
          label: '',
          data: dataArr,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(0, 200, 83, 0.2)',
            'rgba(255, 87, 34, 0.2)',
            'rgba(33, 150, 243, 0.2)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(0, 200, 83, 1)',
            'rgba(255, 87, 34, 1)',
            'rgba(33, 150, 243, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

// 막대 차트를 그리는 함수(연도)
function drawChartsYear(dataList) {
  var lineChart = $('#myChart2');

  var ctx = document.getElementById('myChart2').getContext('2d');
  if (Chart.getChart(lineChart)) {
    // 기존 차트 삭제
    Chart.getChart(lineChart)?.destroy();
  }

  var labelArr = dataList.map(item => item.year); // 연도 정보
  var dataArr = dataList.map(item => item.loanCnt); // 대출 건수 정보

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelArr,
      datasets: [
        {
          label: '',
          data: dataArr,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

// 태그 클라우드를 그리는 함수 (도서검색)
function drawTagCloud(dataList) {
  // 기존 태그 클라우드 제거
  const wordCloudCanvas = document.getElementById('wordCloudCanvas');
  wordCloudCanvas.innerHTML = ''; // 기존 태그 초기화

  const words = dataList.map(data => [data.tag, data.weight * 8]);

  function getRandomDarkColor() {
    var hue = Math.floor(Math.random() * 360);
    var saturation = Math.floor(Math.random() * 40) + 60;
    var lightness = Math.floor(Math.random() * 20) + 20;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  if (dataList.length > 0) {
    WordCloud(wordCloudCanvas, {
      list: words.map(word => [word[0], word[1]]),
      gridSize: 10,
      weightFactor: 3,
      color: getRandomDarkColor,
      backgroundColor: '#f8f8f8',
      rotateRatio: 0,
      drawOutOfBound: false,
      shuffle: true,
      click: function (item) {
        var word = item[0];
        fn_tagCloudSearch(word);
      },
    });

    //  <span> 태그를 <a> 태그로 변환
    setTimeout(() => {
      document.querySelectorAll('#wordCloudCanvas span').forEach(span => {
        let word = span.textContent;
        let aTag = document.createElement('a');

        // 2️⃣ 기존 스타일 유지
        aTag.textContent = word;
        aTag.href = `javascript:fn_tagCloudSearch('${word}')`; // 클릭 시 검색 실행
        aTag.style.cssText = span.style.cssText; // 기존 스타일 유지
        aTag.style.textDecoration = 'none'; // 밑줄 제거
        aTag.style.cursor = 'pointer'; // 클릭 가능하도록 변경

        span.replaceWith(aTag);
      });
    }, 500); // WordCloud가 렌더링된 후 실행
  } else {
    // 데이터가 없을 경우 안내 메시지 표시
    const message = document.createElement('div');
    message.textContent = '키워드가 없습니다.';
    message.style.textAlign = 'center';
    message.style.color = '#888';
    message.style.fontSize = '16px';
    message.style.marginTop = '20px';
    wordCloudCanvas.appendChild(message);
  }
}

// 태그 클라우드 클릭 시 키워드 검색(일반)
function fn_tagCloudSearch(word) {
  const protocol = window.location.protocol;
  const host = window.location.host;
  const pathname = window.location.pathname;
  const pathnameArr = pathname.split('/');
  const siteGb = pathnameArr[1];

  var mi = 0;
  if (siteGb == 'itg') {
    mi = 385;
  } else if (siteGb == 'mch') {
    mi = 391;
  } else if (siteGb == 'cnl') {
    mi = 414;
  } else if (siteGb == 'cni') {
    mi = 456;
  } else if (siteGb == 'yjs') {
    mi = 497;
  } else if (siteGb == 'maj') {
    mi = 539;
  } else if (siteGb == 'sio') {
    mi = 581;
  }

  $('#tagKeywordFrm input[name="searchKeyword"]').val(word);
  $('#tagKeywordFrm').attr('action', '/' + siteGb + '/sch/bsch/list.do?mnidx=' + mi + '');
  $('#tagKeywordFrm').submit();
}

// 선 차트를 그리는 함수(월)
function drawLineChartsMonth(dataList) {
  var lineChart = $('#myLineChart');

  var ctx = document.getElementById('myLineChart').getContext('2d');
  if (Chart.getChart(lineChart)) {
    // 기존 차트 삭제
    Chart.getChart(lineChart)?.destroy();
  }

  var labelArr = dataList.map(item => item.month); // 월 정보
  var dataArr = dataList.map(item => item.loanCnt); // 대출 건수 정보

  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labelArr,
      datasets: [
        {
          label: '대출건수',
          data: dataArr,
          borderColor: 'rgba(255, 69, 0, 1)',
          backgroundColor: 'rgba(255, 69, 0, 0.2)',
          pointBackgroundColor: 'rgba(255, 69, 0, 1)',
          pointRadius: 5,
          borderWidth: 2,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: true,
        },
      },
    },
  });
}
/*
// 태그 클라우드를 그리는 함수 (정보나루)
function drawTagCloudNaru(dataList) {
    // 기존 태그 클라우드 제거
    const wordCloudCanvas = document.getElementById('wordCloudCanvas');
    wordCloudCanvas.innerHTML = ''; // 기존 태그 초기화

	if(dataList.length > 0){

		const words = dataList.map(data => [data.word, data.weight]);

		function getRandomDarkColor() {
	        var hue = Math.floor(Math.random() * 360);
	        var saturation = Math.floor(Math.random() * 40) + 60;
	        var lightness = Math.floor(Math.random() * 20) + 20;
	        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	    }

	    WordCloud(wordCloudCanvas, {
	        list: words.map(function (word) {
	            return [word[0], word[1]];
	        }),
	        gridSize: 10,
	        weightFactor: 3,
	        color: getRandomDarkColor,
	        backgroundColor: '#f8f8f8',
	        rotateRatio: 0,
	        drawOutOfBound: false,
	        shuffle: true,
	        click: function (item, dimension, event) {
	            var word = item[0];
	            fn_tagCloudSearchNaru(word);
	        }
	    });

	}else{
		// 데이터가 없을 경우 안내 메시지 표시
        const message = document.createElement('div');
        message.textContent = '키워드가 없습니다.';
        message.style.textAlign = 'center'; // 가운데 정렬
        message.style.color = '#888'; // 색상
        message.style.fontSize = '16px'; // 폰트 크기
        message.style.marginTop = '20px'; // 상단 여백
        wordCloudCanvas.appendChild(message); // 메시지를 canvas에 추가
	}


}
*/
function drawTagCloudNaru(dataList) {
  // 기존 태그 클라우드 제거
  const wordCloudCanvas = document.getElementById('wordCloudCanvas');
  wordCloudCanvas.innerHTML = ''; // 기존 태그 초기화

  if (dataList.length > 0) {
    const words = dataList.map(data => [data.word, data.weight]);

    function getRandomDarkColor() {
      var hue = Math.floor(Math.random() * 360);
      var saturation = Math.floor(Math.random() * 40) + 60;
      var lightness = Math.floor(Math.random() * 20) + 20;
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    WordCloud(wordCloudCanvas, {
      list: words.map(word => [word[0], word[1]]),
      gridSize: 10,
      weightFactor: 3,
      color: getRandomDarkColor,
      backgroundColor: '#f8f8f8',
      rotateRatio: 0,
      drawOutOfBound: false,
      shuffle: true,
      click: function (item) {
        var word = item[0];
        fn_tagCloudSearchNaru(word);
      },
    });

    // 기존의 <span> 태그를 <a> 태그로 변환하는 코드 추가
    setTimeout(() => {
      document.querySelectorAll('#wordCloudCanvas span').forEach(span => {
        var word = span.textContent;
        var aTag = document.createElement('a');

        // 기존 스타일 및 속성 유지
        aTag.textContent = word;
        aTag.href = `javascript:fn_tagCloudSearchNaru('${word}')`; // 클릭 시 검색 실행
        aTag.style.cssText = span.style.cssText; // 기존 스타일 유지
        aTag.style.textDecoration = 'none'; // 밑줄 제거
        aTag.style.cursor = 'pointer'; // 클릭 가능하도록 변경

        span.replaceWith(aTag); // <span>을 <a>로 변경
      });
    }, 500); // WordCloud 렌더링 후 변환 실행
  } else {
    // 데이터가 없을 경우 안내 메시지 표시
    const message = document.createElement('div');
    message.textContent = '키워드가 없습니다.';
    message.style.textAlign = 'center';
    message.style.color = '#888';
    message.style.fontSize = '16px';
    message.style.marginTop = '20px';
    wordCloudCanvas.appendChild(message);
  }
}

// 태그 클라우드 클릭 시 키워드 검색(정보나루)
function fn_tagCloudSearchNaru(word) {
  const protocol = window.location.protocol;
  const host = window.location.host;
  const pathname = window.location.pathname;
  const pathnameArr = pathname.split('/');
  const siteGb = pathnameArr[1];

  var mi = 0;
  if (siteGb == 'itg') {
    mi = 657;
  } else if (siteGb == 'mch') {
    mi = 657;
  } else if (siteGb == 'cnl') {
    mi = 657;
  } else if (siteGb == 'cni') {
    mi = 657;
  } else if (siteGb == 'yjs') {
    mi = 657;
  } else if (siteGb == 'maj') {
    mi = 657;
  } else if (siteGb == 'sio') {
    mi = 657;
  }

  $('#tagKeywordFrm input[name="keyword"]').val(word);
  $('#tagKeywordFrm').attr('action', '/' + siteGb + '/sch/naru/srchBooks.do?mnidx=' + mi + '');
  $('#tagKeywordFrm').submit();
}
