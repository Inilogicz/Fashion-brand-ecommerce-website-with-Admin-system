"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Ruler } from "lucide-react";

export function SizeGuide() {
    return (
        <Dialog>
            <DialogTrigger className="text-xs text-obsidian/60 underline hover:text-obsidian flex items-center gap-1">
                <Ruler className="h-3 w-3" /> Size Guide
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-cream border-obsidian/10">
                <DialogHeader>
                    <DialogTitle className="font-serif text-2xl text-obsidian text-center pb-4 border-b border-obsidian/10">Size Guide</DialogTitle>
                </DialogHeader>

                <div className="py-6 space-y-8 overflow-y-auto max-h-[70vh]">
                    <div className="space-y-4">
                        <p className="text-sm text-obsidian/70 text-center">
                            All measurements are in inches. For the best fit, measure your body and compare to the chart below.
                        </p>

                        <div className="border border-obsidian/10 rounded-sm overflow-hidden">
                            <table className="w-full text-sm text-obsidian">
                                <thead className="bg-obsidian/5 uppercase tracking-wider text-xs font-medium">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Size</th>
                                        <th className="px-4 py-3 text-left">US</th>
                                        <th className="px-4 py-3 text-left">UK</th>
                                        <th className="px-4 py-3 text-left">Bust</th>
                                        <th className="px-4 py-3 text-left">Waist</th>
                                        <th className="px-4 py-3 text-left">Hips</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-obsidian/5 bg-white">
                                    <tr>
                                        <td className="px-4 py-3 font-medium">XS</td>
                                        <td className="px-4 py-3">0-2</td>
                                        <td className="px-4 py-3">4-6</td>
                                        <td className="px-4 py-3">31-32</td>
                                        <td className="px-4 py-3">24-25</td>
                                        <td className="px-4 py-3">34-35</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium">S</td>
                                        <td className="px-4 py-3">4-6</td>
                                        <td className="px-4 py-3">8-10</td>
                                        <td className="px-4 py-3">33-34</td>
                                        <td className="px-4 py-3">26-27</td>
                                        <td className="px-4 py-3">36-37</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium">M</td>
                                        <td className="px-4 py-3">8-10</td>
                                        <td className="px-4 py-3">12-14</td>
                                        <td className="px-4 py-3">35-36</td>
                                        <td className="px-4 py-3">28-29</td>
                                        <td className="px-4 py-3">38-39</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium">L</td>
                                        <td className="px-4 py-3">12-14</td>
                                        <td className="px-4 py-3">16-18</td>
                                        <td className="px-4 py-3">37-39</td>
                                        <td className="px-4 py-3">30-32</td>
                                        <td className="px-4 py-3">40-42</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium">XL</td>
                                        <td className="px-4 py-3">16-18</td>
                                        <td className="px-4 py-3">20-22</td>
                                        <td className="px-4 py-3">40-42</td>
                                        <td className="px-4 py-3">33-35</td>
                                        <td className="px-4 py-3">43-45</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-medium">XXL</td>
                                        <td className="px-4 py-3">20-22</td>
                                        <td className="px-4 py-3">24-26</td>
                                        <td className="px-4 py-3">43-45</td>
                                        <td className="px-4 py-3">36-38</td>
                                        <td className="px-4 py-3">46-48</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-obsidian/5 p-4 rounded-sm">
                        <h4 className="font-serif text-lg mb-2 text-obsidian">How to Measure</h4>
                        <ul className="text-sm space-y-2 text-obsidian/80 list-disc list-inside">
                            <li><strong>Bust:</strong> Measure around the fullest part of your bust.</li>
                            <li><strong>Waist:</strong> Measure around your natural waistline (narrowest part).</li>
                            <li><strong>Hips:</strong> Measure around the fullest part of your hips.</li>
                        </ul>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
