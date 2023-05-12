// RecipeCard.js

class RecipeCard extends HTMLElement {

	// Called once when document.createElement('recipe-card') is called, or
	// the element is written into the DOM directly as <recipe-card>
	constructor() {
		super(); // Inheret everything from HTMLElement
		
		let shadow = this.attachShadow({mode: "open"});
		let article = document.createElement("article");
		let styles = document.createElement("style");
		styles.appendChild(document.createTextNode(`*{font-family:sans-serif;margin:0;padding:0}a{text-decoration:none}a:hover{text-decoration:underline}article{align-items:center;border:1px solid #dfe1e5;border-radius:8px;display:grid;grid-template-rows:118px 56px 14px 18px 15px 36px;height:auto;row-gap:5px;padding:0 16px 16px;width:178px}div.rating{align-items:center;column-gap:5px;display:flex}div.rating>img{height:auto;display:inline-block;object-fit:scale-down;width:78px}article>img{border-top-left-radius:8px;border-top-right-radius:8px;height:118px;object-fit:cover;margin-left:-16px;width:calc(100% + 32px)}p.ingredients{height:32px;line-height:16px;padding-top:4px;overflow:hidden}p.organization{color:#000!important}p.title{display:-webkit-box;font-size:16px;height:36px;line-height:18px;overflow:hidden;-webkit-line-clamp:2;-webkit-box-orient:vertical}p:not(.title),span,time{color:#70757a;font-size:12px}`));
		shadow.appendChild(styles);
		shadow.appendChild(article);
	}

	/**
	 * Called when the .data property is set on this element.
	 *
	 * For Example:
	 * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
	 * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
	 *
	 * @param {Object} data - The data to pass into the <recipe-card>, must be of the
	 *                        following format:
	 *                        {
	 *                          "imgSrc": "string",
	 *                          "imgAlt": "string",
	 *                          "titleLnk": "string",
	 *                          "titleTxt": "string",
	 *                          "organization": "string",
	 *                          "rating": number,
	 *                          "numRatings": number,
	 *                          "lengthTime": "string",
	 *                          "ingredients": "string"
	 *                        }
	 */
	set data(data) {
		// If nothing was passed in, return
		if (!data) return;

		/**
		 * Don't use innerHTML to set the text of elements. 
		 * Attackers could control the input JSON object and 
		 * initiate an XSS attack.
		 */

		console.log(data);
		//data.rating = parseInt(data.rating) || 0;

		let recipeImg = document.createElement("img");
		recipeImg.src = data.imgSrc;
		recipeImg.alt = data.imgAlt;

		let title = document.createElement("p");
		title.classList.add("title");
		let titleLink = document.createElement("a");
		titleLink.href = data.titleLnk;
		titleLink.append(data.titleTxt);
		title.append(titleLink);
		
		let organization = document.createElement("p");
		organization.classList.add("organization");
		organization.append(data.organization);

		let rating = document.createElement("div");
		let ratingText = document.createElement("span");
		let stars = document.createElement("img");
		let ratingNum = document.createElement("span");
		rating.classList.add("rating")
		ratingText.append(data.rating);
		stars.src = `/assets/images/icons/${data.rating}-star.svg`;
		stars.alt = `${data.rating} stars`;
		ratingNum.append(`(${data.numRatings})`);
		rating.append(ratingText, stars, ratingNum);

		let time = document.createElement("time");
		time.append(data.lengthTime);
		
		let ingredients = document.createElement("p");
		ingredients.classList.add("ingredients");
		ingredients.append(data.ingredients);

		this.shadowRoot.querySelector("article").append(
			recipeImg,
			title,
			organization,
			rating,
			time,
			ingredients
		);
	}
}

customElements.define("recipe-card", RecipeCard);

// A8. TODO - Define the Class as a customElement so that you can create
//           'recipe-card' elements
