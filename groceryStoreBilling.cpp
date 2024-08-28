#include <stdio.h>
#include <string.h>
#include <stdlib.h>

struct items {                                   ///Define structure/       
    char product[15];
    int price;
    int quantity;
    struct items* next;
};
typedef struct items node;
//--------------------Display Function------------------------------/
void display(node* head) {
    int count = 1;
    node* p = head;
    while (p != NULL) {
        printf("| %d.   %15s \t\t\t%d\t\t%d \t\t    \n", count, p->product, p->quantity,p->price );
        count++;
        p = p->next;
    }
    printf("\n");
}
//--------------------------Discount Function------------------------/
int discount(int bill) {
    int discount;
    if (bill >= 100 && bill < 250) {
        discount = (2 * bill / 100);
        bill = bill - discount;
    }
    else if (bill >= 250 && bill < 500) {
        discount = (5 * bill / 100);
        bill = bill - discount;
    }
    else if (bill >= 500 && bill < 750) {
        discount = (7 * bill / 100);
        bill = bill - discount;
    }
    else if (bill >= 750 && bill < 1000) {
        discount = (10 * bill / 100);
        bill = bill - discount;
    }
    else if (bill >= 1000) {
        discount = (15 * bill / 100);
        bill = bill - discount;
    }
    return bill;
}
//-----------------------------MAIN FUNCTION-----------------------------------/
int main() {
    //SHOPPING LIST/
    printf("|-----------------------------------|\n");
    printf("|** SHOP LIST **|\n");
    printf("|  *WELCOME TO OUR FRESH MART*  |\n");
    printf("|-----------------------------------|\n");
    printf("|   ITEM          PRICE     PER     |\n");
    printf("|- - - - - - - - - - - - - - - - - -|\n");
    printf("\n");
    printf("|1. Broom           70      piece   |\n");
    printf("|2. Chocolate       40      piece   |\n");
    printf("|3. Soap            25      piece   |\n");
    printf("|4. Perfume         200     piece   |\n");
    printf("|5. Shampoo         120     pkt     |\n");
    printf("|6. Biscuit         15      pkt     |\n");
    printf("|7. Washing Powder  125     pkt     |\n");
    printf("|8. Salt            27      pkt     |\n");
    printf("|9. eggs            72      dozen   |\n");
    printf("|10. Oil            98      lit     |\n");
    printf("|11. Milk           45      lit     |\n");
    printf("|12. Rice           50      kg      |\n");
    printf("|13. Tea Powder     100     kg      |\n");
    printf("|14. Flour          45      kg      |\n");
    printf("|15. Sugar          40      kg      |\n");
    printf("|-----------------------------------|\n");
    printf("\n");

    node* head = NULL;
    int bill = 0;
    int n, choice, price;
    char yn;
//------------------------- BILLING PART ------------------------/
    do {
        char item[30];
        printf("ENTER CHOICE: ");
        scanf("%d", &choice);
        printf("ENTER QUANTITY: ");
        scanf("%d", &n);

        node* element = (node*)malloc(sizeof(node));

        switch (choice) {
        case 1:
            strcpy(item, "Broom");
            price = 70;
            break;
        case 2:
            strcpy(item, "Chocolate");
            price = 40;
            break;
        case 3:
            strcpy(item, "Soap");
            price = 25;
            break;
        case 4:
            strcpy(item, "Perfume");
            price = 200;
            break;
        case 5:
            strcpy(item, "Shampoo");
            price = 120;
            break;
        case 6:
            strcpy(item, "Biscuit");
            price = 15;
            break;
        case 7:
            strcpy(item, "Washing Powder");
            price = 125;
            break;
        case 8:
            strcpy(item, "Salt");
            price = 27;
            break;
        case 9:
            strcpy(item, "Eggs");
            price = 72;
            break;
        case 10:
            strcpy(item, "Oil");
            price = 98;
            break;
        case 11:
            strcpy(item, "Milk");
            price = 45;
            break;
        case 12:
            strcpy(item, "Rice");
            price = 50;
            break;
        case 13:
            strcpy(item, "Tea Powder");
            price = 100;
            break;
        case 14:
            strcpy(item, "Flour");
            price = 45;
            break;
        case 15:
            strcpy(item, "Sugar");
            price = 40;
            break;
        default:
            printf("Invalid choice.\n");
            free(element);  // Free allocated memory
            continue;
        }

        bill = bill + n * price;

        strcpy(element->product, item);
        element->price = n*price;
        element->quantity = n;
        element->next = NULL;

        if (head == NULL) {
            head = element;
        }
        else {
            node* p = head;
            while (p->next != NULL) {
                p = p->next;
            }
            p->next = element;
        }

        printf("Do you want to continue (y/n)? ");
        scanf(" %c", &yn);
        printf("\n");
    } while (yn == 'y');
//--------------------------------BILL RECEIPT PART---------------------------/
    printf("|---------------------------------------------------------------|\n");
    printf("|                   *WELCOME TO OUR FRESH MART*                 |\n");
    printf("|---------------------------------------------------------------|\n");
    printf("|               Product             Quantity           Price    | \n");
    printf("|---------------------------------------------------------------|\n");
    display(head);
    printf("|---------------------------------------------------------------|\n");
    printf("|   Total Quantity:                   Total amount    : %d      \n", bill);
    int bill1 = discount(bill);   //including discount if any applicable
    printf("|                                     Disount         : %d      \n", bill - bill1);
    printf("|                                     Payable amount  : %d      \n", bill1);
    printf("|---------------------------------------------------------------|\n");
    printf("|                ***THANKS FOR VISITING OUR SHOP**              |\n");
    printf("|---------------------------------------------------------------|\n");

    // Free allocated memory
    node* current = head;
    while (current != NULL) {
        node* temp = current;
        current = current->next;
        free(temp);
    }
    return 0;
}
