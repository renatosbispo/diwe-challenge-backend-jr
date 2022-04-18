# DIWE Challenge - Jr. Back-end Developer

![License Badge](https://img.shields.io/github/license/renatosbispo/diwe-challenge-backend-jr?color=blue)
![GitHub Issues Badge](https://img.shields.io/github/issues/renatosbispo/diwe-challenge-backend-jr?color=success)

This is my solution to [**DIWE**](https://diwe.com.br/)'s technical challenge for the
**Junior Back-end Developer** position.

[The challenge](https://github.com/diwe-engineering/challenge-backend-jr)
consists of building a **REST API** to serve data to a financial management system.
I have also created a public [**Trello board**](https://trello.com/b/gNnSkVn0/diwe-challenge-jr-back-end-developer)
for the project to allow for the tracking of its progress.

## Table of Contents

- [Problem Domain](https://github.com/renatosbispo/diwe-challenge-backend-jr#problem-domain)
- [Database Structure](https://github.com/renatosbispo/diwe-challenge-backend-jr#database-structure)
  - [Suggested Structure](https://github.com/renatosbispo/diwe-challenge-backend-jr#suggested-structure)
  - [My Interpretation of the Structure](https://github.com/renatosbispo/diwe-challenge-backend-jr#my-interpretation-of-the-structure)
  - [Normalization](https://github.com/renatosbispo/diwe-challenge-backend-jr#normalization)
  - [Additional Considerations](https://github.com/renatosbispo/diwe-challenge-backend-jr#additional-considerations)
- [Acknowledgments](https://github.com/renatosbispo/diwe-challenge-backend-jr#acknowledgments)

## Problem Domain

As stated before, the challenge consists of building a REST API to serve data to
a financial management system. So to better understand the problem domain and make
sure the developed solution would fit the problem description, I did some research
about financial management systems and also referred to some systems of this kind
I have used in the past.

After this research, I decided my implementation would be geared towards a personal
finance management platform, like [Mobills](https://www.mobills.com.br/), [Organizze](https://www.organizze.com.br/)
(both quite popular in Brazil) and [Mint](https://mint.intuit.com/).

There are **two** main reasons for that:

1. It makes the problem more familiar to me in comparison with an equivalent
   system geared towards a company, for example.
2. It seems to fit better the database structure suggested by the challenge,
   as detailed below.

## Database Structure

In this section, I describe the database structure of the project and present some considerations about it.

### Suggested Structure

The challenge specification described the following entities and their attributes:

- **User:**
  - **id:** auto increment, integer
  - **full_name:** required, string (120)
  - **email**: required, string (200)
  - **password**: required, string (200)
  - **created_at**: required, timestamp
  - **updated_at**: required, timestamp

- **Status:**
  - **id**: auto increment, integer
  - **name**: required, string (100)

- **Type:**
  - **id**: auto increment, integer
  - **name**: required, string (100)

- **Financial Entry:**
  - **id**: auto increment, integer
  - **status_id**: integer, FK (Status)
  - **user_id**: integer, FK (User)
  - **type_id**: integer, FK (Type)
  - **amount**: required, integer (a value like 10.42 should be stored as 1042)
  - **description**: required, string (255)
  - **created_at**: required, timestamp
  - **updated_at**: required, timestamp

### My Interpretation of the Structure

It's quite obvious what the entities `User` and `Financial Entry` represent. However, that's not the case for the entities `Status` and `Type`, at least not at first glance.

So based on the research I did and on the approach I took (as described in the [Problem Domain](https://github.com/renatosbispo/diwe-challenge-backend-jr#problem-domain) section), I decided to interpret `Status` as being one of two possible values, `paid` or `unpaid`, while `Type` as being either `income` or `expense`.

This seems to fit well within the context of a personal finance management platform and doesn't overcomplicate the problem.

### Normalization

When I looked at the suggested database structure for the first time, I intuitively concluded it was normalized, but I wanted to make sure. So I created a [**spreadsheet**](https://docs.google.com/spreadsheets/d/1pKhywY8Gzh49S9JklbxqQwmRfsi-p_731UUSxQYMels/edit?usp=sharing) with the entities, their attributes and a few values to conduct this analysis.

The goal of this step was to ensure normalization up to the Third Normal Form, according to the following definitions compiled by me while studying this topic for the first time a few months ago:

- **First Normal Form (1NF):**
  - Each field of a table may contain only one item
  - All of the data items in a column must mean the same thing (be of the same type)
  - Each row of the table must be unique
  - A table must have no repeating columns.

- **Second Normal Form (2NF)**:
  - The data must be in 1NF
  - There must be no **partial dependencies**:
    - Each non-key field must be about the same thing as the primary key
    - Each table must contain data about only one type of thing.

- **Third Normal Form (3NF):**
  - The data must be in 2NF
  - There must be no **transitive dependencies**:
    - There is no other non-key attribute that would need to be changed in a table if another non-key attribute was changed.

Although these definitions are not formal, they seemed to be good enough heuristics, especially for a simple structure like the one suggested for this challenge.

### Additional Considerations

One important aspect that seems to be missing from this suggested database structure is the entity `Account`, which would represent an essential concept in any financial management system.

However, adding that entity to the suggested structure would create a few problems:

- Additional data structure complexity
- Additional endpoints (at least `GET /accounts` and `POST /accounts`)
- Additional business rules (e.g., perhaps a user should not be able to create a financial entry of the `expense` type whose value is greater than the available balance in the relevant account).

So for the sake of simplicity and to make sure I would be able to meet the agreed deadline, I decided to keep the suggested data structure as it is.

## Acknowledgments

The fine people at [**DIWE**](https://diwe.com.br/) gave me **explicit permission** to host this project on a public repository so I could include it in my portfolio. For that alone, and regardless of the result of this selection process, I would like to express my profound gratitude, especially to [Maicon](https://www.linkedin.com/in/maicon-gracioli-passos-02849438/) and [MV](https://www.linkedin.com/in/mvbassalobre/).
