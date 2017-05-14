
	var M = 0;
	var N = 0;
	var R = 0;
	var D = 0;
	
	var resM = 0;
	var resN = 0;
	var resR = 0;
	var resD = 0;
	

	var kuparinHinta = 0;
	var lhinta = 0;
	
	function getAnswer()
	{
		var B = Number(document.getElementById("sisahalkaisija").value);
		D = B;
		var H = Number(document.getElementById("leveys").value);
		var W = Number(document.getElementById("halkaisija").value);
		var L = Number(document.getElementById("induktanssi").value);
		L *= 1000;
		kuparinHinta = Number(document.getElementById("copper").value);
		lhinta = Number(document.getElementById("lahtohinta").value);
	
		var C = 0.00000;
		var A = 0.0;
		var V = 0.0;
		var N = 0.0;
		
		if( B <= 0 || H <= 0 || W <= 0 || L <= 0 )
			return false;
			
		while(true)
		{
			C = (D-B) / 2;
			A = (B+C) / 2;
			N = Math.sqrt(L * ( 1.9 * A + 2.85 * H + 3.18 * C) / (Math.pow(A, 2) * 0.01));
			
			if(N == 0)
			{
				alert("Nollalla jako.");
				return false;
			}
			
			V = Math.sqrt(H * C / N);
			if( V < 0.99 * W)
			{
				D += 0.5;
			}
			else
			{
				break;
			}
		}
							
		var ulkohalkaisiaPoikkeama = 0.05 * D;
		var kierrosPoikkeama = 0.05 * N;
		
		
		document.getElementById("D").innerHTML = "D = " + myRound((D + ulkohalkaisiaPoikkeama), 2) + "mm";			
		document.getElementById("N").innerHTML = "N = " + myRound((N + kierrosPoikkeama), 2);
		
		
		
		R = N * 2 * A * 0.001* 1.7241 * (1 * Math.pow(10, -8)) * 4 / (Math.pow(W, 2) * 0.000001);
		
		M = 8960 * Math.pow(( 3.1416 * Math.pow(( W * 0.001 ), 2) / 4), 2) * R / ( 1.7241 * 1 * Math.pow(10, -8));
		
		var vastusPoikkeama = 0.05 * R;
		var massaPoikkeama = 0.05 * M;
		
		document.getElementById("R").innerHTML = "R = " + myRound((R + vastusPoikkeama),2) + " ohmia";
		document.getElementById("M").innerHTML = "m = " + myRound(((M + massaPoikkeama) * 1000),2) + "g";
		resN = N;
		resM = M;
		resR = R;
		resD = D;
		
		laskeKuparinHinta(massaPoikkeama);
		
		return false;
	};			
	
	
	
	
	function laskeKuparinHinta(offset)
	{
		if(kuparinHinta > 0)
		{
			document.getElementById("alvitonhinta").innerHTML = "Veroton hinta: " + myRound(((M + offset) * kuparinHinta + lhinta), 2)  + " € (Alv 0%)";
			document.getElementById("myyntihinta").innerHTML = "Vähittäis myynti hinta: " + myRound(((M + offset) * kuparinHinta + lhinta) * 2, 2) + " € (Alv 24%)";
		}
		else
		{
			document.getElementById("hinta").innerHTML = "Kuparin hintaa ei määritelty";
		}
	};
	
	function tryChange()
	{
		var B = Number(document.getElementById("sisahalkaisija").value);
		var H = Number(document.getElementById("leveys").value);
		var W = Number(document.getElementById("halkaisija").value);
		var L = Number(document.getElementById("induktanssi").value);
		var K = Number(document.getElementById("copper").value);
		var A = Number(document.getElementById("lahtohinta").value);
		
		if(B < 0)
			document.getElementById("sisahalkaisija").value = 0;
		if(H < 0)		
			document.getElementById("leveys").value = 0;
		if(W < 0)
			document.getElementById("halkaisija").value = 0;
		if(L < 0)
			document.getElementById("induktanssi").value = 0;
		if(K < 0)
			document.getElementById("copper").value = 0;
		if(A < 0)
			document.getElementById("lahtohinta").value = 0;

	};
	
	function myRound(number, precision) {
		var factor = Math.pow(10, precision);
		var tempNumber = number * factor;
		var roundedTempNumber = Math.round(tempNumber);
		return roundedTempNumber / factor;
	};
